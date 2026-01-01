// 🇻🇳 Dịch vụ cung cấp thông tin cấu hình và đăng ký module cho Shell
// 🇺🇸 Service providing configuration and module registry information for Shell
import '../../../core/api/api_client.dart';
import '../data/models/m_tb_shell_mod.dart';

class S_Api_Shell {
  final Api_Client apiClient;

  S_Api_Shell({Api_Client? apiClient})
      : apiClient = apiClient ?? Api_Client();

  // 🇻🇳 Lấy danh sách module đăng ký
  // 🇺🇸 Get registered modules list
  Future<List<M_Tb_Shell_Mod>> get_registry() async {
    final response = await apiClient.get<List<M_Tb_Shell_Mod>>(
      '/shell/registry',
      fromJson: (json) => (json as List)
          .map((e) => M_Tb_Shell_Mod.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
    return response.data ?? [];
  }

  // 🇻🇳 Lấy cấu hình hệ thống
  // 🇺🇸 Get system configuration
  Future<Map<String, dynamic>> get_sys_cfg() async {
    final response = await apiClient.get<Map<String, dynamic>>(
      '/shell/config',
      fromJson: (json) => json,
    );
    return response.data ?? {};
  }
}

