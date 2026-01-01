// 🇻🇳 API quản trị vai trò và phân quyền
// 🇺🇸 Role and permission management API
import '../../../core/api/api_client.dart';
import '../data/models/m_tb_auth_role.dart';

class S_Api_Auth_Adm_Role {
  final Api_Client apiClient;

  S_Api_Auth_Adm_Role({Api_Client? apiClient})
      : apiClient = apiClient ?? Api_Client();

  // 🇻🇳 Lấy danh sách vai trò
  // 🇺🇸 Get role list
  Future<List<M_Tb_Auth_Role>> list() async {
    final response = await apiClient.get<List<M_Tb_Auth_Role>>(
      '/auth/admin/roles',
      fromJson: (json) => (json as List)
          .map((e) => M_Tb_Auth_Role.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
    return response.data ?? [];
  }

  // 🇻🇳 Xóa vai trò
  // 🇺🇸 Delete role
  Future<bool> delete(String id) async {
    final response = await apiClient.delete<bool>(
      '/auth/admin/roles/$id',
      fromJson: (json) => json['data'] as bool? ?? false,
    );
    return response.data ?? false;
  }

  // 🇻🇳 Thêm/Sửa vai trò
  // 🇺🇸 Upsert role
  Future<String> upsert(M_Tb_Auth_Role role) async {
    final response = await apiClient.post<Map<String, dynamic>>(
      '/auth/admin/roles',
      body: role.toJson(),
      fromJson: (json) => json,
    );
    return response.data?['id'] as String? ?? '';
  }

  // 🇻🇳 Lưu phân quyền cho vai trò
  // 🇺🇸 Save permissions for role
  Future<bool> save_perms(String roleId, List<String> permIds) async {
    final response = await apiClient.post<bool>(
      '/auth/admin/roles/perms',
      body: {'roleId': roleId, 'permIds': permIds},
      fromJson: (json) => json['data'] as bool? ?? false,
    );
    return response.data ?? false;
  }
}

