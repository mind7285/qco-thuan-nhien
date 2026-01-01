# TN POS System - Flutter Mobile App

Ứng dụng mobile cho TN POS System được viết bằng Flutter.

## Yêu cầu

- Flutter SDK >= 3.0.0
- Dart SDK >= 3.0.0
- Go API server đang chạy (mặc định: http://localhost:3000)

## Cài đặt

1. **Cài đặt dependencies:**
```bash
flutter pub get
```

2. **Generate code (Freezed, Riverpod):**
```bash
dart run build_runner build --delete-conflicting-outputs
```

3. **Cấu hình API base URL:**
   - Mặc định: `http://localhost:3000`
   - Có thể thay đổi trong `src/core/api/api_client.dart`

## Chạy ứng dụng

### Development
```bash
# Dùng Makefile
make run

# Hoặc trực tiếp
flutter run
```

### Chạy trên device cụ thể
```bash
# List devices
flutter devices

# Run on specific device
flutter run -d <device_id>
```

### Build
```bash
# Android APK
flutter build apk

# iOS (macOS only)
flutter build ios
```

## Cấu trúc Project

```
src/
├── core/              # Core utilities
│   ├── api/          # API client
│   └── models/       # Base models
└── features/         # Feature modules
    ├── auth/         # Auth module
    │   ├── data/     # Models
    │   ├── services/ # API services
    │   └── ui/       # UI screens & providers
    └── shell/        # Shell module
        ├── data/
        ├── services/
        └── ui/
```

## Routes

### Public Routes
- `/auth/login` - Đăng nhập
- `/auth/register` - Đăng ký
- `/auth/forgot-pwd` - Quên mật khẩu

### Protected Routes (Auth Required)
- `/home` - Trang chủ (Shell)
- `/auth/users` - Danh sách người dùng
- `/auth/users/form` - Form thêm/sửa user
- `/auth/roles` - Danh sách vai trò
- `/auth/roles/form` - Form thêm/sửa role
- `/auth/roles/perms` - Phân quyền cho role
- `/auth/perms` - Danh sách quyền hạn

## Troubleshooting

1. **Lỗi "Target of URI hasn't been generated: '...g.dart'":**
   ```bash
   # Bước 1: Cài đặt dependencies
   flutter pub get
   
   # Bước 2: Generate code
   dart run build_runner build --delete-conflicting-outputs
   
   # Hoặc dùng Makefile
   make gen
   ```
   Xem thêm: [GENERATE_CODE.md](./GENERATE_CODE.md)

2. **Lỗi "Undefined name 'state'":**
   - Đảm bảo đã chạy code generation: `dart run build_runner build --delete-conflicting-outputs`
   - Kiểm tra `pubspec.yaml` có đủ dependencies (riverpod_generator, build_runner)

3. **Lỗi kết nối API:**
   - Kiểm tra Go API server đang chạy
   - Kiểm tra base URL trong `api_client.dart`
   - Kiểm tra CORS settings trên API server

4. **Lỗi build_runner:**
   - Xóa các file generated cũ: `dart run build_runner clean`
   - Chạy lại: `dart run build_runner build --delete-conflicting-outputs`

5. **Lỗi Xcode Simulator "Unable to find a destination matching the provided destination specifier":**
   ```bash
   # Bước 1: List available simulators
   flutter devices
   
   # Bước 2: Open Xcode và kiểm tra simulators
   # - Mở Xcode > Settings > Platforms (hoặc Components)
   # - Đảm bảo iOS SDK version phù hợp đã được cài đặt
   # - Xcode > Window > Devices and Simulators > Simulators
   # - Tạo hoặc chọn một simulator hợp lệ
   
   # Bước 3: Clean build folder
   cd ios
   rm -rf Pods Podfile.lock
   pod install
   cd ..
   flutter clean
   
   # Bước 4: Chọn simulator cụ thể
   flutter run -d <device_id>
   
   # Hoặc mở Xcode và chọn simulator từ dropdown
   open ios/Runner.xcworkspace
   ```
   
   **Giải pháp nhanh:**
   - Mở Xcode: `open ios/Runner.xcworkspace`
   - Chọn một simulator có sẵn từ dropdown (không phải "Any iOS Device")
   - Chạy lại: `flutter run`
   
   **Nếu vẫn lỗi:**
   - Kiểm tra Xcode Command Line Tools: `xcode-select --print-path`
   - Cài đặt lại: `sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer`
   - Reset simulators: `xcrun simctl erase all`

