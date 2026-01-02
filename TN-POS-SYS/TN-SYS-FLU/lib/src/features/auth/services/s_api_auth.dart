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
    // Server trả về: { "user": {...}, "token": "..." }
    final response = await apiClient.post<Map<String, dynamic>>(
      '/auth/login',
      body: {'usrName': usrName, 'pwd': pwd},
      fromJson: (json) => json, // Lấy raw map thay vì parse user ngay
    );

    if (response.data == null) {
      throw Exception('Login failed: Empty response');
    }

    final data = response.data!;
    
    // Kiểm tra và lấy thông tin user
    if (data['user'] == null) {
      throw Exception('Login failed: User data missing');
    }
    
    // Lấy token (để xử lý sau)
    final token = data['token'] as String?;
    if (token != null) {
        print('🔑 Token received: ${token.substring(0, 10)}...');
        // Lưu token vào secure storage
        await apiClient.saveToken(token);
    }

    final userMap = data['user'] as Map<String, dynamic>;
    return M_Tb_Auth_Usr.fromJson(userMap);
  }

  // 🇻🇳 Đăng xuất
  // 🇺🇸 Logout
  Future<bool> logout() async {
    try {
      final response = await apiClient.post<bool>(
        '/auth/logout',
        fromJson: (json) => json['data'] as bool? ?? false,
      );
      
      // Xóa token sau khi logout thành công
      await apiClient.clearToken();
      
      return response.data ?? false;
    } catch (e) {
      // Dù API lỗi, vẫn xóa token để user thoát được
      await apiClient.clearToken();
      rethrow;
    }
  }

  // 🇻🇳 Đăng ký
  // 🇺🇸 Register
  Future<String> register(M_Tb_Auth_Usr usr) async {
    final response = await apiClient.post<Map<String, dynamic>>(
      '/auth/register',
      body: usr.toJson(),
      fromJson: (json) => json,
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

