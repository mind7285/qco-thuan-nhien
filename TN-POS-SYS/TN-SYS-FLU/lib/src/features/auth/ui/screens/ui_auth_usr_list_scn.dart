// 🇻🇳 Screen quản lý danh sách người dùng (Admin)
// 🇺🇸 User list management screen (Admin)
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/ui_auth_admin_provider.dart';
import '../../data/models/m_tb_auth_usr.dart';

class UiAuthUsrListScn extends ConsumerWidget {
  const UiAuthUsrListScn({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(uiAuthUsrListLogicProvider);
    final logic = ref.read(uiAuthUsrListLogicProvider.notifier);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Danh sách người dùng'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () {
              // ⚡️ Ui_Auth_Handle_Usr_Add()
              Navigator.of(context).pushNamed('/auth/users/form');
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
              : state.users.isEmpty
                  ? const Center(
                      child: Text('Chưa có người dùng nào'),
                    )
                  : ListView.builder(
                      itemCount: state.users.length,
                      itemBuilder: (context, index) {
                        final usr = state.users[index];
                        return _buildUserItem(context, usr, logic);
                      },
                    ),
    );
  }

  // 🎨 Build user item
  Widget _buildUserItem(
    BuildContext context,
    M_Tb_Auth_Usr usr,
    UiAuthUsrListLogic logic,
  ) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: ListTile(
        leading: CircleAvatar(
          child: Text(usr.c_full_name.isNotEmpty
              ? usr.c_full_name[0].toUpperCase()
              : 'U'),
        ),
        title: Text(usr.c_full_name),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Tên đăng nhập: ${usr.c_usr_name}'),
            if (usr.c_email != null) Text('Email: ${usr.c_email}'),
            if (usr.c_phone != null) Text('Điện thoại: ${usr.c_phone}'),
          ],
        ),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            IconButton(
              icon: const Icon(Icons.edit),
              onPressed: () {
                // ⚡️ Ui_Auth_Handle_Usr_Edit()
                Navigator.of(context).pushNamed(
                  '/auth/users/form',
                  arguments: usr,
                );
              },
              tooltip: 'Sửa',
            ),
            IconButton(
              icon: const Icon(Icons.delete, color: Colors.red),
              onPressed: () => _handleDelete(context, usr, logic),
              tooltip: 'Xóa',
            ),
          ],
        ),
      ),
    );
  }

  // ⚡️ Xử lý xóa user
  Future<void> _handleDelete(
    BuildContext context,
    M_Tb_Auth_Usr usr,
    UiAuthUsrListLogic logic,
  ) async {
    // 💫 1. Hiển thị Dialog xác nhận
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Xác nhận'),
        content: Text('Bạn có chắc muốn xoá người dùng ${usr.c_full_name}?'),
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
    final result = await logic.handleDelete(usr);

    if (context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(result
              ? 'Đã xoá người dùng'
              : 'Lỗi khi xóa người dùng'),
          backgroundColor: result ? Colors.green : Colors.red,
        ),
      );
    }
  }
}

