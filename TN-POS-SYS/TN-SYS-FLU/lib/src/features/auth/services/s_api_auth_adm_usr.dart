// 🇻🇳 API quản trị người dùng
// 🇺🇸 User management API
import '../../../core/api/api_client.dart';
import '../data/models/m_tb_auth_usr.dart';

class S_Api_Auth_Adm_Usr {
  final Api_Client apiClient;

  S_Api_Auth_Adm_Usr({Api_Client? apiClient})
      : apiClient = apiClient ?? Api_Client();

  // 🇻🇳 Lấy danh sách người dùng
  // 🇺🇸 Get user list
  Future<List<M_Tb_Auth_Usr>> list() async {
    final response = await apiClient.get<List<M_Tb_Auth_Usr>>(
      '/auth/admin/users',
      fromJson: (json) => (json as List)
          .map((e) => M_Tb_Auth_Usr.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
    return response.data ?? [];
  }

  // 🇻🇳 Xóa người dùng
  // 🇺🇸 Delete user
  Future<bool> delete(String id) async {
    final response = await apiClient.delete<bool>(
      '/auth/admin/users/$id',
      fromJson: (json) => json['data'] as bool? ?? false,
    );
    return response.data ?? false;
  }

  // 🇻🇳 Thêm/Sửa người dùng
  // 🇺🇸 Upsert user
  Future<String> upsert(M_Tb_Auth_Usr usr) async {
    final response = await apiClient.post<Map<String, dynamic>>(
      '/auth/admin/users',
      body: usr.toJson(),
      fromJson: (json) => json,
    );
    return response.data?['id'] as String? ?? '';
  }
}

