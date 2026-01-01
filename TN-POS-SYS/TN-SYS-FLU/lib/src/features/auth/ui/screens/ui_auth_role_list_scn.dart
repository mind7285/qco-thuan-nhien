// 🇻🇳 Screen quản lý danh sách vai trò
// 🇺🇸 Role list management screen
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/ui_auth_admin_provider.dart';
import '../../data/models/m_tb_auth_role.dart';

class UiAuthRoleListScn extends ConsumerWidget {
  const UiAuthRoleListScn({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(uiAuthRoleListLogicProvider);
    final logic = ref.read(uiAuthRoleListLogicProvider.notifier);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Danh sách vai trò'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () {
              // ⚡️ Ui_Auth_Handle_Role_Add()
              Navigator.of(context).pushNamed('/auth/roles/form');
            },
            tooltip: 'Thêm mới',
          ),
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => logic.reload(),
            tooltip: 'Làm mới',
          ),
        ],
      ),
      body: state.isLoading
          ? const Center(child: CircularProgressIndicator())
          : state.errorMessage != null
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'Lỗi: ${state.errorMessage}',
                        style: const TextStyle(color: Colors.red),
                      ),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: () => logic.reload(),
                        child: const Text('Thử lại'),
                      ),
                    ],
                  ),
                )
              : state.roles.isEmpty
                  ? const Center(
                      child: Text('Chưa có vai trò nào'),
                    )
                  : ListView.builder(
                      itemCount: state.roles.length,
                      itemBuilder: (context, index) {
                        final role = state.roles[index];
                        return _buildRoleItem(context, role, logic);
                      },
                    ),
    );
  }

  // 🎨 Build role item
  Widget _buildRoleItem(
    BuildContext context,
    M_Tb_Auth_Role role,
    UiAuthRoleListLogic logic,
  ) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: ListTile(
        leading: CircleAvatar(
          child: Text(role.c_role_name.isNotEmpty
              ? role.c_role_name[0].toUpperCase()
              : 'R'),
        ),
        title: Text(role.c_role_name),
        subtitle: Text('Mã: ${role.c_role_code}'),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            IconButton(
              icon: const Icon(Icons.security),
              onPressed: () {
                // ⚡️ Ui_Auth_Handle_Role_Perm()
                Navigator.of(context).pushNamed(
                  '/auth/roles/perms',
                  arguments: {'roleId': role.q_id, 'roleName': role.c_role_name},
                );
              },
              tooltip: 'Phân quyền',
            ),
            IconButton(
              icon: const Icon(Icons.edit),
              onPressed: () {
                // ⚡️ Ui_Auth_Handle_Role_Edit()
                Navigator.of(context).pushNamed(
                  '/auth/roles/form',
                  arguments: role,
                );
              },
              tooltip: 'Sửa',
            ),
            IconButton(
              icon: const Icon(Icons.delete, color: Colors.red),
              onPressed: () => _handleDelete(context, role, logic),
              tooltip: 'Xóa',
            ),
          ],
        ),
      ),
    );
  }

  // ⚡️ Xử lý xóa role
  Future<void> _handleDelete(
    BuildContext context,
    M_Tb_Auth_Role role,
    UiAuthRoleListLogic logic,
  ) async {
    // 💫 1. Hiển thị Dialog xác nhận
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Xác nhận'),
        content: const Text(
          'Xoá vai trò này sẽ ảnh hưởng đến các user đang gán. Tiếp tục?',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Hủy'),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            style: TextButton.styleFrom(foregroundColor: Colors.red),
            child: const Text('Xóa'),
          ),
        ],
      ),
    );

    if (confirmed != true) return;

    // 💫 2. Gọi API delete
    final result = await logic.handleDelete(role);

    if (context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(result ? 'Đã xoá vai trò' : 'Lỗi khi xóa vai trò'),
          backgroundColor: result ? Colors.green : Colors.red,
        ),
      );
    }
  }
}

