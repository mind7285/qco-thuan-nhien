// 🇻🇳 Screen đăng nhập hệ thống
// 🇺🇸 System login screen
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gap/gap.dart';
import '../providers/ui_auth_provider.dart';

class UiAuthLoginScn extends ConsumerStatefulWidget {
  const UiAuthLoginScn({super.key});

  @override
  ConsumerState<UiAuthLoginScn> createState() => _UiAuthLoginScnState();
}

class _UiAuthLoginScnState extends ConsumerState<UiAuthLoginScn> {
  final _usrNameController = TextEditingController();
  final _pwdController = TextEditingController();

  @override
  void dispose() {
    _usrNameController.dispose();
    _pwdController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(uiAuthLoginLogicProvider);
    final logic = ref.read(uiAuthLoginLogicProvider.notifier);

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
                        // Logo
                        const Text(
                          '🔐',
                          style: TextStyle(fontSize: 100),
                        ),
                        const Gap(24),

                        // Title
                        const Text(
                          'ĐĂNG NHẬP HỆ THỐNG',
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
                          onChanged: (value) => logic.updateUsrName(value),
                          autofocus: true,
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
                          onChanged: (value) => logic.updatePwd(value),
                        ),
                        const Gap(24),

                        // Login button
                        SizedBox(
                          width: double.infinity,
                          height: isMobile ? 56 : 44,
                          child: ElevatedButton(
                            onPressed: state.isLoading
                                ? null
                                : () async {
                                    final user = await logic.handleLogin();
                                    if (user != null && mounted) {
                                      // 💫 5. Nếu thành công, chuyển hướng đến /home
                                      Navigator.of(context).pushReplacementNamed('/home');
                                    }
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
                                    'ĐĂNG NHẬP',
                                    style: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                          ),
                        ),
                        const Gap(16),

                        // Actions
                        if (isMobile)
                          Column(
                            children: [
                              TextButton(
                                onPressed: () {
                                  Navigator.of(context).pushNamed('/auth/forgot-pwd');
                                },
                                child: const Text('Quên mật khẩu?'),
                              ),
                              TextButton(
                                onPressed: () {
                                  Navigator.of(context).pushNamed('/auth/register');
                                },
                                child: const Text('Đăng ký ngay'),
                              ),
                            ],
                          )
                        else
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              TextButton(
                                onPressed: () {
                                  Navigator.of(context).pushNamed('/auth/forgot-pwd');
                                },
                                child: const Text('Quên mật khẩu?'),
                              ),
                              TextButton(
                                onPressed: () {
                                  Navigator.of(context).pushNamed('/auth/register');
                                },
                                child: const Text('Đăng ký ngay'),
                              ),
                            ],
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

