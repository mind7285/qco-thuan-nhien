// 🇻🇳 API cung cấp các dịch vụ liên quan đến Authentication
// 🇺🇸 API providing authentication-related services
import '../../../core/api/api_client.dart';
import '../data/models/m_tb_auth_usr.dart';

class S_Api_Auth {
  final Api_Client apiClient;

  S_Api_Auth({Api_Client? apiClient})
      : apiClient = apiClient ?? Api_Client();

  // 🇻🇳 Đăng nhập
  // 🇺🇸 Login
  Future<M_Tb_Auth_Usr> login(String usrName, String pwd) async {
    final response = await apiClient.post<M_Tb_Auth_Usr>(
      '/auth/login',
      body: {'usrName': usrName, 'pwd': pwd},
      fromJson: (json) => M_Tb_Auth_Usr.fromJson(json),
    );
    if (response.data == null) {
      throw Exception('Login failed');
    }
    return response.data!;
  }

  // 🇻🇳 Đăng xuất
  // 🇺🇸 Logout
  Future<bool> logout() async {
    final response = await apiClient.post<bool>(
      '/auth/logout',
      fromJson: (json) => json['data'] as bool? ?? false,
    );
    return response.data ?? false;
  }

  // 🇻🇳 Đăng ký
  // 🇺🇸 Register
  Future<String> register(M_Tb_Auth_Usr usr) async {
    final response = await apiClient.post<Map<String, dynamic>>(
      '/auth/register',
      body: usr.toJson(),
      fromJson: (json) => json as Map<String, dynamic>,
    );
    return response.data?['id'] as String? ?? '';
  }

  // 🇻🇳 Quên mật khẩu
  // 🇺🇸 Forgot password
  Future<bool> forgot_pwd(String email) async {
    final response = await apiClient.post<bool>(
      '/auth/forgot-pwd',
      body: {'email': email},
      fromJson: (json) => json['data'] as bool? ?? false,
    );
    return response.data ?? false;
  }

  // 🇻🇳 Đổi mật khẩu
  // 🇺🇸 Change password
  Future<bool> change_pwd(String oldPwd, String newPwd) async {
    final response = await apiClient.post<bool>(
      '/auth/change-pwd',
      body: {'oldPwd': oldPwd, 'newPwd': newPwd},
      fromJson: (json) => json['data'] as bool? ?? false,
    );
    return response.data ?? false;
  }

  // 🇻🇳 Kiểm tra quyền
  // 🇺🇸 Check permission
  Future<bool> has_perm(String permCode) async {
    final response = await apiClient.get<bool>(
      '/auth/has-perm/$permCode',
      fromJson: (json) => json['data'] as bool? ?? false,
    );
    return response.data ?? false;
  }
}

