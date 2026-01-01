# Code Generation Guide

## Fix Missing Generated Files

Nếu bạn gặp lỗi:
```
Target of URI hasn't been generated: 'file:///.../ui_auth_provider.g.dart'
```

Hãy chạy lệnh sau để generate code:

```bash
cd /Volumes/WORKSPACE/THUAN-NHIEN/qco-thuan-nhien/TN-POS-SYS/TN-SYS-FLU
flutter pub get
dart run build_runner build --delete-conflicting-outputs
```

Hoặc sử dụng Makefile:
```bash
make gen
```

## Files That Need Generation

Các file sau sử dụng code generation và cần được generate:
- `src/features/auth/ui/providers/ui_auth_provider.g.dart`
- `src/features/auth/ui/providers/ui_auth_admin_provider.g.dart`
- `src/features/shell/ui/providers/ui_shell_provider.g.dart`
- `src/features/auth/ui/screens/ui_auth_role_perm_scn.g.dart`
- `src/features/auth/ui/screens/ui_auth_perm_list_scn.g.dart`

## Watch Mode (Development)

Để tự động generate khi có thay đổi:
```bash
dart run build_runner watch --delete-conflicting-outputs
```

