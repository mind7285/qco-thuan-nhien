// 🇻🇳 Provider quản lý trạng thái Auth
// 🇺🇸 Auth state management provider
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../data/models/m_tb_auth_usr.dart';
import '../../services/s_api_auth.dart';

part 'ui_auth_provider.g.dart';

// 🇻🇳 State cho Login
// 🇺🇸 Login State
class UiAuthLoginState {
  final String usrName;
  final String pwd;
  final bool isLoading;
  final String? errorMessage;

  const UiAuthLoginState({
    this.usrName = '',
    this.pwd = '',
    this.isLoading = false,
    this.errorMessage,
  });

  UiAuthLoginState copyWith({
    String? usrName,
    String? pwd,
    bool? isLoading,
    String? errorMessage,
  }) {
    return UiAuthLoginState(
      usrName: usrName ?? this.usrName,
      pwd: pwd ?? this.pwd,
      isLoading: isLoading ?? this.isLoading,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}

// 🇻🇳 Logic Notifier cho Login
// 🇺🇸 Login Logic Notifier
@riverpod
class UiAuthLoginLogic extends _$UiAuthLoginLogic {
  @override
  UiAuthLoginState build() {
    return const UiAuthLoginState();
  }

  // ⚡️ Update username
  void updateUsrName(String value) {
    state = state.copyWith(usrName: value, errorMessage: null);
  }

  // ⚡️ Update password
  void updatePwd(String value) {
    state = state.copyWith(pwd: value, errorMessage: null);
  }

  // ⚡️ Xử lý đăng nhập
  Future<M_Tb_Auth_Usr?> handleLogin() async {
    // 💫 1. Kiểm tra hợp lệ
    if (state.usrName.isEmpty || state.pwd.isEmpty) {
      state = state.copyWith(errorMessage: 'Vui lòng nhập đầy đủ thông tin');
      return null;
    }

    state = state.copyWith(isLoading: true, errorMessage: null);

    try {
      // 💫 2. Gọi API login
      final authService = S_Api_Auth();
      final user = await authService.login(state.usrName, state.pwd);

      // 💫 3. Lưu user data
      // TODO: Save to secure storage

      state = state.copyWith(isLoading: false);
      return user;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        errorMessage: e.toString(),
      );
      return null;
    }
  }
}

// 🇻🇳 State cho Register
// 🇺🇸 Register State
class UiAuthRegisterState {
  final String usrName;
  final String pwd;
  final String fullName;
  final String email;
  final bool isLoading;
  final String? errorMessage;

  const UiAuthRegisterState({
    this.usrName = '',
    this.pwd = '',
    this.fullName = '',
    this.email = '',
    this.isLoading = false,
    this.errorMessage,
  });

  UiAuthRegisterState copyWith({
    String? usrName,
    String? pwd,
    String? fullName,
    String? email,
    bool? isLoading,
    String? errorMessage,
  }) {
    return UiAuthRegisterState(
      usrName: usrName ?? this.usrName,
      pwd: pwd ?? this.pwd,
      fullName: fullName ?? this.fullName,
      email: email ?? this.email,
      isLoading: isLoading ?? this.isLoading,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}

// 🇻🇳 Logic Notifier cho Register
// 🇺🇸 Register Logic Notifier
@riverpod
class UiAuthRegisterLogic extends _$UiAuthRegisterLogic {
  @override
  UiAuthRegisterState build() {
    return const UiAuthRegisterState();
  }

  // ⚡️ Update fields
  void updateField(String field, String value) {
    state = state.copyWith(
      usrName: field == 'usrName' ? value : state.usrName,
      pwd: field == 'pwd' ? value : state.pwd,
      fullName: field == 'fullName' ? value : state.fullName,
      email: field == 'email' ? value : state.email,
      errorMessage: null,
    );
  }

  // ⚡️ Xử lý đăng ký
  Future<String?> handleRegister() async {
    // 💫 1. Kiểm tra hợp lệ
    if (state.usrName.isEmpty ||
        state.pwd.isEmpty ||
        state.fullName.isEmpty ||
        state.email.isEmpty) {
      state = state.copyWith(errorMessage: 'Vui lòng nhập đầy đủ thông tin');
      return null;
    }

    // 💫 2. Kiểm tra email format
    final emailRegex = RegExp(r'^[^\s@]+@[^\s@]+\.[^\s@]+$');
    if (!emailRegex.hasMatch(state.email)) {
      state = state.copyWith(errorMessage: 'Email không hợp lệ');
      return null;
    }

    state = state.copyWith(isLoading: true, errorMessage: null);

    try {
      // 💫 3. Gọi API register
      final authService = S_Api_Auth();
      final usr = M_Tb_Auth_Usr(
        q_id: '',
        q_seq: 1,
        c_usr_name: state.usrName,
        c_pwd_hash: state.pwd, // TODO: Hash password
        c_full_name: state.fullName,
        c_email: state.email,
        q_status: 0,
        q_version: 0,
        q_is_deleted: false,
        q_created_at: 0,
        q_updated_at: 0,
      );

      final userId = await authService.register(usr);
      state = state.copyWith(isLoading: false);
      return userId;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        errorMessage: e.toString(),
      );
      return null;
    }
  }
}

// 🇻🇳 State cho Forgot Password
// 🇺🇸 Forgot Password State
class UiAuthForgotPwdState {
  final String email;
  final bool isLoading;
  final String? errorMessage;
  final String? successMessage;

  const UiAuthForgotPwdState({
    this.email = '',
    this.isLoading = false,
    this.errorMessage,
    this.successMessage,
  });

  UiAuthForgotPwdState copyWith({
    String? email,
    bool? isLoading,
    String? errorMessage,
    String? successMessage,
  }) {
    return UiAuthForgotPwdState(
      email: email ?? this.email,
      isLoading: isLoading ?? this.isLoading,
      errorMessage: errorMessage ?? this.errorMessage,
      successMessage: successMessage ?? this.successMessage,
    );
  }
}

// 🇻🇳 Logic Notifier cho Forgot Password
// 🇺🇸 Forgot Password Logic Notifier
@riverpod
class UiAuthForgotPwdLogic extends _$UiAuthForgotPwdLogic {
  @override
  UiAuthForgotPwdState build() {
    return const UiAuthForgotPwdState();
  }

  // ⚡️ Update email
  void updateEmail(String value) {
    state = state.copyWith(email: value, errorMessage: null, successMessage: null);
  }

  // ⚡️ Xử lý quên mật khẩu
  Future<bool> handleForgotPwd() async {
    // 💫 1. Kiểm tra hợp lệ email
    final emailRegex = RegExp(r'^[^\s@]+@[^\s@]+\.[^\s@]+$');
    if (!emailRegex.hasMatch(state.email)) {
      state = state.copyWith(errorMessage: 'Email không hợp lệ');
      return false;
    }

    state = state.copyWith(isLoading: true, errorMessage: null, successMessage: null);

    try {
      // 💫 2. Gọi API forgot password
      final authService = S_Api_Auth();
      await authService.forgot_pwd(state.email);

      // 💫 4. Luôn báo thành công để bảo mật
      state = state.copyWith(
        isLoading: false,
        successMessage: 'Nếu email tồn tại trong hệ thống, chúng tôi đã gửi mã khôi phục.',
      );
      return true;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        errorMessage: e.toString(),
      );
      return false;
    }
  }
}

