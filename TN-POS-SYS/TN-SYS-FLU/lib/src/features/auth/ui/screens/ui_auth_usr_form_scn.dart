// 🇻🇳 Screen thêm/sửa thông tin người dùng
// 🇺🇸 User form screen (Add/Edit)
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gap/gap.dart';
import '../providers/ui_auth_admin_provider.dart';
import '../../data/models/m_tb_auth_usr.dart';

class UiAuthUsrFormScn extends ConsumerStatefulWidget {
  const UiAuthUsrFormScn({super.key});

  @override
  ConsumerState<UiAuthUsrFormScn> createState() => _UiAuthUsrFormScnState();
}

class _UiAuthUsrFormScnState extends ConsumerState<UiAuthUsrFormScn> {
  final _fullNameController = TextEditingController();
  final _usrNameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final args = ModalRoute.of(context)?.settings.arguments;
      if (args is M_Tb_Auth_Usr) {
        // 💫 Load user data vào form
        ref.read(uiAuthUsrFormLogicProvider.notifier).loadUser(args);
        _fullNameController.text = args.c_full_name;
        _usrNameController.text = args.c_usr_name;
        _emailController.text = args.c_email ?? '';
        _phoneController.text = args.c_phone ?? '';
      } else {
        // 💫 Mode: New - Reset form
        ref.read(uiAuthUsrFormLogicProvider.notifier).loadUser(null);
      }
    });
  }

  @override
  void dispose() {
    _fullNameController.dispose();
    _usrNameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(uiAuthUsrFormLogicProvider);
    final logic = ref.read(uiAuthUsrFormLogicProvider.notifier);

    final isEdit = state.usr?.q_id.isNotEmpty ?? false;

    return Scaffold(
      appBar: AppBar(
        title: Text(isEdit ? 'Sửa người dùng' : 'Thêm người dùng'),
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

            // Full Name
            TextField(
              controller: _fullNameController,
              decoration: const InputDecoration(
                labelText: 'Họ và tên *',
                prefixIcon: Icon(Icons.person),
                border: OutlineInputBorder(),
              ),
              onChanged: (value) => logic.updateField('full_name', value),
            ),
            const Gap(16),

            // Username
            TextField(
              controller: _usrNameController,
              decoration: const InputDecoration(
                labelText: 'Tên đăng nhập *',
                prefixIcon: Icon(Icons.account_circle),
                border: OutlineInputBorder(),
              ),
              enabled: !isEdit, // Không cho sửa username khi edit
              onChanged: (value) => logic.updateField('usr_name', value),
            ),
            const Gap(16),

            // Email
            TextField(
              controller: _emailController,
              decoration: const InputDecoration(
                labelText: 'Email',
                prefixIcon: Icon(Icons.email),
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.emailAddress,
              onChanged: (value) => logic.updateField('email', value),
            ),
            const Gap(16),

            // Phone
            TextField(
              controller: _phoneController,
              decoration: const InputDecoration(
                labelText: 'Số điện thoại',
                prefixIcon: Icon(Icons.phone),
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.phone,
              onChanged: (value) => logic.updateField('phone', value),
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
                  // ⚡️ Ui_Auth_Handle_Usr_Cancel()
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
    UiAuthUsrFormLogic logic,
  ) async {
    // 💫 1. Validate và gọi API
    final userId = await logic.handleSave();

    if (!context.mounted) return;

    if (userId != null) {
      // 💫 3. Nếu thành công: Toast Success và quay lại
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Đã lưu thành công'),
          backgroundColor: Colors.green,
        ),
      );
      Navigator.of(context).pop(true); // Return true để reload list
    } else {
      // 💫 4. Nếu lỗi: Toast Error
      final currentState = ref.read(uiAuthUsrFormLogicProvider);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Lỗi: ${currentState.errorMessage ?? 'Không xác định'}'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }
}

