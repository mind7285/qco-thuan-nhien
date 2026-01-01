// 🇻🇳 Screen đăng ký tài khoản mới
// 🇺🇸 New account registration screen
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gap/gap.dart';
import '../providers/ui_auth_provider.dart';

class UiAuthRegisterScn extends ConsumerStatefulWidget {
  const UiAuthRegisterScn({super.key});

  @override
  ConsumerState<UiAuthRegisterScn> createState() => _UiAuthRegisterScnState();
}

class _UiAuthRegisterScnState extends ConsumerState<UiAuthRegisterScn> {
  final _fullNameController = TextEditingController();
  final _emailController = TextEditingController();
  final _usrNameController = TextEditingController();
  final _pwdController = TextEditingController();

  @override
  void dispose() {
    _fullNameController.dispose();
    _emailController.dispose();
    _usrNameController.dispose();
    _pwdController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(uiAuthRegisterLogicProvider);
    final logic = ref.read(uiAuthRegisterLogicProvider.notifier);

    return Scaffold(
      body: SafeArea(
        child: LayoutBuilder(
          builder: (context, constraints) {
            final isMobile = constraints.maxWidth < 769;

            return Container(
              width: double.infinity,
              height: double.infinity,
              padding: EdgeInsets.all(isMobile ? 24 : 0),
              decoration: BoxDecoration(
                color: isMobile ? Colors.white : const Color(0xFFF5F5F5),
              ),
              child: Center(
                child: Container(
                  constraints: const BoxConstraints(maxWidth: 400),
                  padding: EdgeInsets.all(isMobile ? 0 : 40),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(8),
                    boxShadow: isMobile
                        ? null
                        : [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.1),
                              blurRadius: 10,
                              offset: const Offset(0, 4),
                            ),
                          ],
                  ),
                  child: SingleChildScrollView(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        // Title
                        const Text(
                          'Đăng ký tài khoản',
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.w600,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const Gap(32),

                        // Error message
                        if (state.errorMessage != null)
                          Padding(
                            padding: const EdgeInsets.only(bottom: 16),
                            child: Text(
                              state.errorMessage!,
                              style: const TextStyle(color: Colors.red),
                              textAlign: TextAlign.center,
                            ),
                          ),

                        // Full name field
                        TextField(
                          controller: _fullNameController,
                          decoration: const InputDecoration(
                            labelText: 'Họ và tên',
                            border: OutlineInputBorder(),
                            contentPadding: EdgeInsets.symmetric(
                              horizontal: 16,
                              vertical: 12,
                            ),
                          ),
                          onChanged: (value) => logic.updateField('fullName', value),
                        ),
                        const Gap(20),

                        // Email field
                        TextField(
                          controller: _emailController,
                          decoration: const InputDecoration(
                            labelText: 'Email',
                            prefixIcon: Icon(Icons.email),
                            border: OutlineInputBorder(),
                            contentPadding: EdgeInsets.symmetric(
                              horizontal: 16,
                              vertical: 12,
                            ),
                          ),
                          keyboardType: TextInputType.emailAddress,
                          onChanged: (value) => logic.updateField('email', value),
                        ),
                        const Gap(20),

                        // Username field
                        TextField(
                          controller: _usrNameController,
                          decoration: const InputDecoration(
                            labelText: 'Tên đăng nhập',
                            prefixIcon: Icon(Icons.person),
                            border: OutlineInputBorder(),
                            contentPadding: EdgeInsets.symmetric(
                              horizontal: 16,
                              vertical: 12,
                            ),
                          ),
                          onChanged: (value) => logic.updateField('usrName', value),
                        ),
                        const Gap(20),

                        // Password field
                        TextField(
                          controller: _pwdController,
                          decoration: const InputDecoration(
                            labelText: 'Mật khẩu',
                            prefixIcon: Icon(Icons.lock),
                            border: OutlineInputBorder(),
                            contentPadding: EdgeInsets.symmetric(
                              horizontal: 16,
                              vertical: 12,
                            ),
                          ),
                          obscureText: true,
                          onChanged: (value) => logic.updateField('pwd', value),
                        ),
                        const Gap(24),

                        // Register button
                        SizedBox(
                          width: double.infinity,
                          height: isMobile ? 56 : 44,
                          child: ElevatedButton(
                            onPressed: state.isLoading
                                ? null
                                : () async {
                                    final userId = await logic.handleRegister();
                                    if (userId != null && mounted) {
                                      // 💫 5. Nếu thành công, chuyển hướng đến /auth/login
                                      ScaffoldMessenger.of(context).showSnackBar(
                                        const SnackBar(
                                          content: Text('Đăng ký thành công! Vui lòng đăng nhập.'),
                                        ),
                                      );
                                      Navigator.of(context).pushReplacementNamed('/auth/login');
                                    }
                                  },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF28A745),
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
                                    'ĐĂNG KÝ',
                                    style: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                          ),
                        ),
                        const Gap(16),

                        // Link to login
                        TextButton(
                          onPressed: () {
                            Navigator.of(context).pushReplacementNamed('/auth/login');
                          },
                          child: const Text('Đã có tài khoản? Đăng nhập'),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}

