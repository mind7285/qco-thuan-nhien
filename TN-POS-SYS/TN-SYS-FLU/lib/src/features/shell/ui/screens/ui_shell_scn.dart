// 🇻🇳 Màn hình Shell chính, quản lý bố cục tổng thể
// 🇺🇸 Main Shell screen, managing overall layout
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/ui_shell_provider.dart';
import '../widgets/ui_shell_sidebar_wgt.dart';
import '../widgets/ui_shell_header_wgt.dart';
import '../../../auth/services/s_api_auth.dart';

class UiShellScn extends ConsumerWidget {
  final Widget child;

  const UiShellScn({
    super.key,
    required this.child,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(uiShellLogicProvider);
    final logic = ref.read(uiShellLogicProvider.notifier);

    // 📱 Mobile Layout
    if (MediaQuery.of(context).size.width < 769) {
      return Scaffold(
        appBar: AppBar(
          title: Text(_getCurrentModuleTitle(state)),
          actions: [
            IconButton(
              icon: const Icon(Icons.menu),
              onPressed: () => logic.toggleSidebar(),
            ),
          ],
        ),
        drawer: state.isSidebarOpen
            ? Drawer(
                child: UiShellSidebarWgt(
                  modules: state.modules,
                  currentModuleId: state.currentModule,
                  onModClick: (modId) {
                    logic.handleNav(modId);
                    Navigator.of(context).pop(); // Close drawer
                  },
                ),
              )
            : null,
        body: SafeArea(child: child),
        bottomNavigationBar: _buildTabBar(context, state, logic),
      );
    }

    // 💻 Desktop Layout
    return Scaffold(
      body: Row(
        children: [
          // Sidebar
          if (state.isSidebarOpen)
            UiShellSidebarWgt(
              modules: state.modules,
              currentModuleId: state.currentModule,
              onModClick: (modId) => logic.handleNav(modId),
            ),
          // Main Content
          Expanded(
            child: Column(
              children: [
                // Header
                UiShellHeaderWgt(
                  title: _getCurrentModuleTitle(state),
                  onLogout: () => _handleLogout(context, ref),
                ),
                // Content
                Expanded(
                  child: SafeArea(child: child),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // 💎 Helper - Get current module title
  String _getCurrentModuleTitle(UiShellState state) {
    if (state.currentModule.isEmpty) return 'POS System';
    final module = state.modules.firstWhere(
      (m) => m.c_mod_id == state.currentModule,
      orElse: () => state.modules.isNotEmpty ? state.modules.first : throw StateError('No modules'),
    );
    return module.c_title;
  }

  // 🎨 Build TabBar for Mobile
  Widget? _buildTabBar(
    BuildContext context,
    UiShellState state,
    UiShellLogic logic,
  ) {
    if (state.modules.length <= 4) {
      return BottomNavigationBar(
        currentIndex: state.modules.indexWhere(
              (m) => m.c_mod_id == state.currentModule,
            ) >= 0
            ? state.modules.indexWhere((m) => m.c_mod_id == state.currentModule)
            : 0,
        onTap: (index) {
          if (index < state.modules.length) {
            logic.handleNav(state.modules[index].c_mod_id);
          }
        },
        items: state.modules.take(4).map((mod) {
          return BottomNavigationBarItem(
            icon: Text(mod.c_icon.isNotEmpty ? mod.c_icon : '📦'),
            label: mod.c_title,
          );
        }).toList(),
      );
    }
    return null;
  }

  // ⚡️ Xử lý đăng xuất
  Future<void> _handleLogout(BuildContext context, WidgetRef ref) async {
    // 💫 1. Hiển thị hộp thoại xác nhận
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Xác nhận'),
        content: const Text('Bạn có chắc muốn đăng xuất?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Hủy'),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Đăng xuất'),
          ),
        ],
      ),
    );

    if (confirmed != true) return;

    try {
      // 💫 2. Gọi API logout
      final authService = S_Api_Auth();
      await authService.logout();

      // 💫 3. Xoá Token và thông tin User tại local
      // TODO: Clear secure storage

      // 💫 4. Điều hướng về màn hình Login
      if (context.mounted) {
        Navigator.of(context).pushReplacementNamed('/auth/login');
      }
    } catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Lỗi đăng xuất: $e')),
        );
      }
    }
  }
}

