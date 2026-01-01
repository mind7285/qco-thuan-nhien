// 🇻🇳 API quản trị quyền hạn hệ thống
// 🇺🇸 System permissions management API
import '../../../core/api/api_client.dart';
import '../data/models/m_tb_auth_mod.dart';

class S_Api_Auth_Adm_Perm {
  final Api_Client apiClient;

  S_Api_Auth_Adm_Perm({Api_Client? apiClient})
      : apiClient = apiClient ?? Api_Client();

  // 🇻🇳 Đồng bộ quyền từ code
  // 🇺🇸 Sync permissions from code
  Future<bool> sync() async {
    final response = await apiClient.post<bool>(
      '/auth/admin/perms/sync',
      fromJson: (json) => json['data'] as bool? ?? false,
    );
    return response.data ?? false;
  }

  // 🇻🇳 Lấy danh sách quyền
  // 🇺🇸 Get permission list
  Future<List<M_Tb_Auth_Mod>> list() async {
    final response = await apiClient.get<List<M_Tb_Auth_Mod>>(
      '/auth/admin/perms',
      fromJson: (json) => (json as List)
          .map((e) => M_Tb_Auth_Mod.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
    return response.data ?? [];
  }
}

