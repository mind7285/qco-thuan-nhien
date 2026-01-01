// 🇻🇳 Screen yêu cầu khôi phục mật khẩu
// 🇺🇸 Password recovery request screen
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gap/gap.dart';
import '../providers/ui_auth_provider.dart';

class UiAuthForgotPwdScn extends ConsumerStatefulWidget {
  const UiAuthForgotPwdScn({super.key});

  @override
  ConsumerState<UiAuthForgotPwdScn> createState() => _UiAuthForgotPwdScnState();
}

class _UiAuthForgotPwdScnState extends ConsumerState<UiAuthForgotPwdScn> {
  final _emailController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(uiAuthForgotPwdLogicProvider);
    final logic = ref.read(uiAuthForgotPwdLogicProvider.notifier);

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
                          'Khôi phục mật khẩu',
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.w600,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const Gap(16),

                        // Description
                        const Text(
                          'Nhập email của bạn để nhận hướng dẫn khôi phục mật khẩu.',
                          style: TextStyle(
                            color: Color(0xFF666666),
                            fontSize: 14,
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

                        // Success message
                        if (state.successMessage != null)
                          Padding(
                            padding: const EdgeInsets.only(bottom: 16),
                            child: Text(
                              state.successMessage!,
                              style: const TextStyle(color: Color(0xFF28A745)),
                              textAlign: TextAlign.center,
                            ),
                          ),

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
                          onChanged: (value) => logic.updateEmail(value),
                        ),
                        const Gap(24),

                        // Submit button
                        SizedBox(
                          width: double.infinity,
                          height: isMobile ? 56 : 44,
                          child: ElevatedButton(
                            onPressed: state.isLoading
                                ? null
                                : () async {
                                    await logic.handleForgotPwd();
                                  },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF007BFF),
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
                                    'GỬI YÊU CẦU',
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
                          child: const Text('Quay lại Đăng nhập'),
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

