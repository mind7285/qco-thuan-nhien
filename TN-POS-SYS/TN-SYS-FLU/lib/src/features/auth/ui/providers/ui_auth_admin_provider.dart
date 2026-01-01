// 🇻🇳 Provider quản lý trạng thái Auth Admin
// 🇺🇸 Auth Admin state management provider
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/models/m_tb_auth_usr.dart';
import '../../data/models/m_tb_auth_role.dart';
import '../../services/s_api_auth_adm_usr.dart';
import '../../services/s_api_auth_adm_role.dart';

// 🇻🇳 State cho User List
// 🇺🇸 User List State
class UiAuthUsrListState {
  final List<M_Tb_Auth_Usr> users;
  final bool isLoading;
  final String? errorMessage;

  const UiAuthUsrListState({
    this.users = const [],
    this.isLoading = false,
    this.errorMessage,
  });

  UiAuthUsrListState copyWith({
    List<M_Tb_Auth_Usr>? users,
    bool? isLoading,
    String? errorMessage,
  }) {
    return UiAuthUsrListState(
      users: users ?? this.users,
      isLoading: isLoading ?? this.isLoading,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}

// 🇻🇳 Logic Notifier cho User List
// 🇺🇸 User List Logic Notifier
class UiAuthUsrListLogic extends StateNotifier<UiAuthUsrListState> {
  UiAuthUsrListLogic() : super(const UiAuthUsrListState()) {
    _loadUsers();
  }

  // ⚡️ Load danh sách users
  Future<void> _loadUsers() async {
    state = state.copyWith(isLoading: true, errorMessage: null);
    try {
      final service = S_Api_Auth_Adm_Usr();
      final users = await service.list();
      state = state.copyWith(users: users, isLoading: false);
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        errorMessage: e.toString(),
      );
    }
  }

  // ⚡️ Reload danh sách
  Future<void> reload() => _loadUsers();

  // ⚡️ Xóa user
  Future<bool> handleDelete(M_Tb_Auth_Usr usr) async {
    try {
      final service = S_Api_Auth_Adm_Usr();
      final result = await service.delete(usr.q_id);
      if (result) {
        await reload();
      }
      return result;
    } catch (e) {
      state = state.copyWith(errorMessage: e.toString());
      return false;
    }
  }
}

// 🇻🇳 Provider cho User List Logic
// 🇺🇸 User List Logic Provider
final uiAuthUsrListLogicProvider = StateNotifierProvider<UiAuthUsrListLogic, UiAuthUsrListState>(
  (ref) => UiAuthUsrListLogic(),
);

// 🇻🇳 State cho User Form
// 🇺🇸 User Form State
class UiAuthUsrFormState {
  final M_Tb_Auth_Usr? usr;
  final bool isLoading;
  final String? errorMessage;

  const UiAuthUsrFormState({
    this.usr,
    this.isLoading = false,
    this.errorMessage,
  });

  UiAuthUsrFormState copyWith({
    M_Tb_Auth_Usr? usr,
    bool? isLoading,
    String? errorMessage,
  }) {
    return UiAuthUsrFormState(
      usr: usr ?? this.usr,
      isLoading: isLoading ?? this.isLoading,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}

// 🇻🇳 Logic Notifier cho User Form
// 🇺🇸 User Form Logic Notifier
class UiAuthUsrFormLogic extends StateNotifier<UiAuthUsrFormState> {
  UiAuthUsrFormLogic() : super(const UiAuthUsrFormState());

  // ⚡️ Load user data
  void loadUser(M_Tb_Auth_Usr? usr) {
    state = state.copyWith(usr: usr);
  }

  // ⚡️ Update field
  void updateField(String field, String value) {
    if (state.usr == null) return;
    final usr = state.usr!;
    final updatedUsr = usr.copyWith(
      c_usr_name: field == 'usr_name' ? value : usr.c_usr_name,
      c_full_name: field == 'full_name' ? value : usr.c_full_name,
      c_email: field == 'email' ? value : usr.c_email,
      c_phone: field == 'phone' ? value : usr.c_phone,
    );
    state = state.copyWith(usr: updatedUsr, errorMessage: null);
  }

  // ⚡️ Lưu user
  Future<String?> handleSave() async {
    if (state.usr == null) return null;

    // 💫 1. Validate
    final usr = state.usr!;
    if (usr.c_full_name.isEmpty || usr.c_usr_name.isEmpty) {
      state = state.copyWith(errorMessage: 'Vui lòng nhập đầy đủ thông tin');
      return null;
    }

    state = state.copyWith(isLoading: true, errorMessage: null);

    try {
      // 💫 2. Gọi API upsert
      final service = S_Api_Auth_Adm_Usr();
      final userId = await service.upsert(usr);
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

// 🇻🇳 Provider cho User Form Logic
// 🇺🇸 User Form Logic Provider
final uiAuthUsrFormLogicProvider = StateNotifierProvider<UiAuthUsrFormLogic, UiAuthUsrFormState>(
  (ref) => UiAuthUsrFormLogic(),
);

// 🇻🇳 State cho Role List
// 🇺🇸 Role List State
class UiAuthRoleListState {
  final List<M_Tb_Auth_Role> roles;
  final bool isLoading;
  final String? errorMessage;

  const UiAuthRoleListState({
    this.roles = const [],
    this.isLoading = false,
    this.errorMessage,
  });

  UiAuthRoleListState copyWith({
    List<M_Tb_Auth_Role>? roles,
    bool? isLoading,
    String? errorMessage,
  }) {
    return UiAuthRoleListState(
      roles: roles ?? this.roles,
      isLoading: isLoading ?? this.isLoading,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}

// 🇻🇳 Logic Notifier cho Role List
// 🇺🇸 Role List Logic Notifier
class UiAuthRoleListLogic extends StateNotifier<UiAuthRoleListState> {
  UiAuthRoleListLogic() : super(const UiAuthRoleListState()) {
    _loadRoles();
  }

  // ⚡️ Load danh sách roles
  Future<void> _loadRoles() async {
    state = state.copyWith(isLoading: true, errorMessage: null);
    try {
      final service = S_Api_Auth_Adm_Role();
      final roles = await service.list();
      state = state.copyWith(roles: roles, isLoading: false);
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        errorMessage: e.toString(),
      );
    }
  }

  // ⚡️ Reload danh sách
  Future<void> reload() => _loadRoles();

  // ⚡️ Xóa role
  Future<bool> handleDelete(M_Tb_Auth_Role role) async {
    try {
      final service = S_Api_Auth_Adm_Role();
      final result = await service.delete(role.q_id);
      if (result) {
        await reload();
      }
      return result;
    } catch (e) {
      state = state.copyWith(errorMessage: e.toString());
      return false;
    }
  }
}

// 🇻🇳 Provider cho Role List Logic
// 🇺🇸 Role List Logic Provider
final uiAuthRoleListLogicProvider = StateNotifierProvider<UiAuthRoleListLogic, UiAuthRoleListState>(
  (ref) => UiAuthRoleListLogic(),
);

// 🇻🇳 State cho Role Form
// 🇺🇸 Role Form State
class UiAuthRoleFormState {
  final M_Tb_Auth_Role? role;
  final bool isLoading;
  final String? errorMessage;

  const UiAuthRoleFormState({
    this.role,
    this.isLoading = false,
    this.errorMessage,
  });

  UiAuthRoleFormState copyWith({
    M_Tb_Auth_Role? role,
    bool? isLoading,
    String? errorMessage,
  }) {
    return UiAuthRoleFormState(
      role: role ?? this.role,
      isLoading: isLoading ?? this.isLoading,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}

// 🇻🇳 Logic Notifier cho Role Form
// 🇺🇸 Role Form Logic Notifier
class UiAuthRoleFormLogic extends StateNotifier<UiAuthRoleFormState> {
  UiAuthRoleFormLogic() : super(const UiAuthRoleFormState());

  // ⚡️ Load role data
  void loadRole(M_Tb_Auth_Role? role) {
    state = state.copyWith(role: role);
  }

  // ⚡️ Update field
  void updateField(String field, String value) {
    if (state.role == null) return;
    final role = state.role!;
    final updatedRole = role.copyWith(
      c_role_name: field == 'role_name' ? value : role.c_role_name,
      c_role_code: field == 'role_code' ? value : role.c_role_code,
    );
    state = state.copyWith(role: updatedRole, errorMessage: null);
  }

  // ⚡️ Lưu role
  Future<String?> handleSave() async {
    if (state.role == null) return null;

    // 💫 1. Validate
    final role = state.role!;
    if (role.c_role_name.isEmpty || role.c_role_code.isEmpty) {
      state = state.copyWith(errorMessage: 'Vui lòng nhập đầy đủ thông tin');
      return null;
    }

    state = state.copyWith(isLoading: true, errorMessage: null);

    try {
      // 💫 2. Gọi API upsert
      final service = S_Api_Auth_Adm_Role();
      final roleId = await service.upsert(role);
      state = state.copyWith(isLoading: false);
      return roleId;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        errorMessage: e.toString(),
      );
      return null;
    }
  }
}

// 🇻🇳 Provider cho Role Form Logic
// 🇺🇸 Role Form Logic Provider
final uiAuthRoleFormLogicProvider = StateNotifierProvider<UiAuthRoleFormLogic, UiAuthRoleFormState>(
  (ref) => UiAuthRoleFormLogic(),
);
