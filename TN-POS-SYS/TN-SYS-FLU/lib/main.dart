// 🇻🇳 Main entry point
// 🇺🇸 Main entry point
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
// Note: Flutter requires code in lib/, but SPEC requires src/
// Solution: Create symlink or use relative imports
// For now, using relative imports from lib/ to src/
import 'src/features/auth/ui/ui.dart';
import 'src/features/shell/ui/ui.dart';

void main() {
  runApp(
    const ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TN POS System',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      initialRoute: '/auth/login',
      routes: {
        // Auth Public Routes
        '/auth/login': (context) => const UiAuthLoginScn(),
        '/auth/register': (context) => const UiAuthRegisterScn(),
        '/auth/forgot-pwd': (context) => const UiAuthForgotPwdScn(),

        // Auth Admin Routes
        '/auth/users': (context) => const UiAuthUsrListScn(),
        '/auth/users/form': (context) => const UiAuthUsrFormScn(),
        '/auth/roles': (context) => const UiAuthRoleListScn(),
        '/auth/roles/form': (context) => const UiAuthRoleFormScn(),
        '/auth/roles/perms': (context) => const UiAuthRolePermScn(),
        '/auth/perms': (context) => const UiAuthPermListScn(),

        // Shell/Home Route
        '/home': (context) => const UiShellScn(
              child: Center(child: Text('Home Screen')),
            ),
      },
    );
  }
}

