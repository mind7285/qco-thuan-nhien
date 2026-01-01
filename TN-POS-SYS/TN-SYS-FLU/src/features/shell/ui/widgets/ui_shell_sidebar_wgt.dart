// 🇻🇳 Sidebar chứa menu điều hướng giữa các module
// 🇺🇸 Sidebar containing navigation menu between modules
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/models/m_tb_shell_mod.dart';

class UiShellSidebarWgt extends ConsumerWidget {
  final List<M_Tb_Shell_Mod> modules;
  final String? currentModuleId;
  final Function(String) onModClick;

  const UiShellSidebarWgt({
    super.key,
    required this.modules,
    this.currentModuleId,
    required this.onModClick,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      width: 250,
      color: const Color(0xFFF5F5F5),
      child: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: modules.length,
        itemBuilder: (context, index) {
          final mod = modules[index];
          final isActive = mod.c_mod_id == currentModuleId;

          return _ModuleItem(
            module: mod,
            isActive: isActive,
            onTap: () => onModClick(mod.c_mod_id),
          );
        },
      ),
    );
  }
}

class _ModuleItem extends StatelessWidget {
  final M_Tb_Shell_Mod module;
  final bool isActive;
  final VoidCallback onTap;

  const _ModuleItem({
    required this.module,
    required this.isActive,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
        margin: const EdgeInsets.only(bottom: 8),
        decoration: BoxDecoration(
          color: isActive ? const Color(0xFF007BFF) : Colors.transparent,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Row(
          children: [
            Text(
              module.c_icon.isNotEmpty ? module.c_icon : '📦',
              style: const TextStyle(fontSize: 20),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Text(
                module.c_title,
                style: TextStyle(
                  color: isActive ? Colors.white : Colors.black87,
                  fontWeight: isActive ? FontWeight.w600 : FontWeight.normal,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

