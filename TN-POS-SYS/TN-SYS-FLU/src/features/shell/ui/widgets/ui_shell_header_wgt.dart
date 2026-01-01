// 🇻🇳 Header chứa thông tin module, thông báo và user menu
// 🇺🇸 Header containing module information, notifications and user menu
import 'package:flutter/material.dart';

class UiShellHeaderWgt extends StatelessWidget {
  final String title;
  final VoidCallback onLogout;

  const UiShellHeaderWgt({
    super.key,
    required this.title,
    required this.onLogout,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 64,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(
          bottom: BorderSide(color: Color(0xFFE0E0E0), width: 1),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title.isNotEmpty ? title : 'POS System',
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
            ),
          ),
          OutlinedButton(
            onPressed: onLogout,
            style: OutlinedButton.styleFrom(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              side: const BorderSide(color: Color(0xFFE0E0E0)),
            ),
            child: const Text('Đăng xuất'),
          ),
        ],
      ),
    );
  }
}

