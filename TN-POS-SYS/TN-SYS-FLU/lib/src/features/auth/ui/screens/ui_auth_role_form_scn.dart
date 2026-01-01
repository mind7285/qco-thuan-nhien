// 🇻🇳 Screen thêm/sửa vai trò
// 🇺🇸 Role form screen (Add/Edit)
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gap/gap.dart';
import '../providers/ui_auth_admin_provider.dart';
import '../../data/models/m_tb_auth_role.dart';

class UiAuthRoleFormScn extends ConsumerStatefulWidget {
  const UiAuthRoleFormScn({super.key});

  @override
  ConsumerState<UiAuthRoleFormScn> createState() => _UiAuthRoleFormScnState();
}

class _UiAuthRoleFormScnState extends ConsumerState<UiAuthRoleFormScn> {
  final _roleNameController = TextEditingController();
  final _roleCodeController = TextEditingController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final args = ModalRoute.of(context)?.settings.arguments;
      if (args is M_Tb_Auth_Role) {
        // 💫 Load role data vào form
        ref.read(uiAuthRoleFormLogicProvider.notifier).loadRole(args);
        _roleNameController.text = args.c_role_name;
        _roleCodeController.text = args.c_role_code;
      } else {
        // 💫 Mode: New - Reset form
        ref.read(uiAuthRoleFormLogicProvider.notifier).loadRole(null);
      }
    });
  }

  @override
  void dispose() {
    _roleNameController.dispose();
    _roleCodeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(uiAuthRoleFormLogicProvider);
    final logic = ref.read(uiAuthRoleFormLogicProvider.notifier);

    final isEdit = state.role?.q_id.isNotEmpty ?? false;

    return Scaffold(
      appBar: AppBar(
        title: Text(isEdit ? 'Sửa vai trò' : 'Thêm vai trò'),
        actions: [
          IconButton(
            icon: const Icon(Icons.save),
            onPressed: state.isLoading ? null : () => _handleSave(context, logic),
            tooltip: 'Lưu',
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Error message
            if (state.errorMessage != null)
              Container(
                padding: const EdgeInsets.all(12),
                margin: const EdgeInsets.only(bottom: 16),
                decoration: BoxDecoration(
                  color: Colors.red.shade50,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: Colors.red.shade200),
                ),
                child: Text(
                  state.errorMessage!,
                  style: const TextStyle(color: Colors.red),
                ),
              ),

            // Role Name
            TextField(
              controller: _roleNameController,
              decoration: const InputDecoration(
                labelText: 'Tên vai trò *',
                prefixIcon: Icon(Icons.badge),
                border: OutlineInputBorder(),
              ),
              onChanged: (value) => logic.updateField('role_name', value),
            ),
            const Gap(16),

            // Role Code
            TextField(
              controller: _roleCodeController,
              decoration: const InputDecoration(
                labelText: 'Mã vai trò *',
                prefixIcon: Icon(Icons.code),
                border: OutlineInputBorder(),
                helperText: 'Mã để check logic (VD: ADMIN, USER)',
              ),
              enabled: !isEdit, // Không cho sửa code khi edit
              onChanged: (value) => logic.updateField('role_code', value),
            ),
            const Gap(32),

            // Save button
            SizedBox(
              height: 48,
              child: ElevatedButton(
                onPressed: state.isLoading
                    ? null
                    : () => _handleSave(context, logic),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  foregroundColor: Colors.white,
                ),
                child: state.isLoading
                    ? const SizedBox(
                        width: 20,
                        height: 20,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                        ),
                      )
                    : const Text(
                        'LƯU',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
              ),
            ),
            const Gap(16),

            // Cancel button
            SizedBox(
              height: 48,
              child: OutlinedButton(
                onPressed: () {
                  // ⚡️ Ui_Auth_Handle_Role_Cancel()
                  Navigator.of(context).pop();
                },
                child: const Text('HỦY'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // ⚡️ Xử lý lưu
  Future<void> _handleSave(
    BuildContext context,
    UiAuthRoleFormLogic logic,
  ) async {
    // 💫 1. Validate và gọi API
    final roleId = await logic.handleSave();

    if (!context.mounted) return;

    if (roleId != null) {
      // 💫 2. Nếu thành công: Toast Success và quay lại
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Đã lưu thành công'),
          backgroundColor: Colors.green,
        ),
      );
      Navigator.of(context).pop(true); // Return true để reload list
    } else {
      // 💫 3. Nếu lỗi: Toast Error
      final currentState = ref.read(uiAuthRoleFormLogicProvider);
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Lỗi: ${currentState.errorMessage ?? 'Không xác định'}'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }
}

