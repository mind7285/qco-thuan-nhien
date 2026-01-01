# TN POS System API

API server cho TN POS System được viết bằng Go.

## Yêu cầu

- Go 1.21 hoặc cao hơn
- PostgreSQL 12+ (đã setup database schema từ TN-SYS-SQL)

## Cài đặt

1. **Cài đặt dependencies:**
```bash
cd src
go mod tidy
```

2. **Cấu hình database trong `config/config.yaml`:**
```yaml
database:
  host: "localhost"
  port: "5432"
  user: "postgres"
  password: "postgres"
  dbname: "qc_thuan_nhien_db"
  sslmode: "disable"
  timezone: "Asia/Ho_Chi_Minh"
```

3. **Setup database schema:**
   - Chạy các file SQL từ `TN-SYS-SQL/db/` theo thứ tự:
     ```bash
     psql -U postgres -d qc_thuan_nhien_db -f ../../TN-SYS-SQL/db/00-core.sql
     psql -U postgres -d qc_thuan_nhien_db -f ../../TN-SYS-SQL/db/01-auth.sql
     psql -U postgres -d qc_thuan_nhien_db -f ../../TN-SYS-SQL/db/02-shell.sql
     ```

4. **Grant permissions cho application user:**
   - Chạy script grant permissions (chạy với user postgres):
     ```bash
     psql -U postgres -d qc_thuan_nhien_db -f ../../TN-SYS-SQL/db/99-grant-permissions-simple.sql
     ```
   - Hoặc nếu dùng user khác, sửa tên user trong file SQL trước khi chạy.

## Chạy Server

### Cách 1: Chạy trực tiếp
```bash
cd src
go run cmd/server/main.go
```

### Cách 2: Build và chạy
```bash
cd src
go build -o bin/server cmd/server/main.go
./bin/server
```

### Cách 3: Sử dụng Makefile (nếu có)
```bash
make run
```

## Kiểm tra

1. **Health check:**
   - Server sẽ chạy tại: `http://localhost:3000`
   - Kiểm tra log để xem server đã start chưa

2. **Swagger UI:**
   - Truy cập: `http://localhost:3000/swagger/index.html`

3. **Test API:**
   ```bash
   # Test public endpoint
   curl http://localhost:3000/api/v1/shell/config
   ```

## Cấu trúc

- `cmd/server/` - Entry point
- `internal/` - Internal packages
  - `model/` - Data models
  - `service/` - Business logic
  - `handler/` - HTTP handlers
  - `router/` - Route setup
- `pkg/` - Public packages
  - `utils/` - Utilities
  - `middleware/` - Middleware
  - `config/` - Configuration
- `config/` - Config files
- `docs/` - Swagger documentation

## API Endpoints

### Public Endpoints
- `GET /api/v1/shell/config` - Lấy cấu hình hệ thống
- `POST /api/v1/auth/login` - Đăng nhập
- `POST /api/v1/auth/register` - Đăng ký
- `POST /api/v1/auth/forgot-pwd` - Quên mật khẩu

### Protected Endpoints (Auth Required)
- `GET /api/v1/shell/registry` - Lấy danh sách modules
- `POST /api/v1/auth/logout` - Đăng xuất
- `POST /api/v1/auth/change-pwd` - Đổi mật khẩu
- `GET /api/v1/auth/has-perm/:permCode` - Kiểm tra quyền

### Admin Endpoints (Auth Required)
- `GET /api/v1/auth/admin/users` - Danh sách users
- `POST /api/v1/auth/admin/users` - Thêm/sửa user
- `DELETE /api/v1/auth/admin/users/:id` - Xóa user
- `GET /api/v1/auth/admin/roles` - Danh sách roles
- `POST /api/v1/auth/admin/roles` - Thêm/sửa role
- `DELETE /api/v1/auth/admin/roles/:id` - Xóa role
- `POST /api/v1/auth/admin/roles/perms` - Lưu phân quyền
- `GET /api/v1/auth/admin/perms` - Danh sách permissions
- `POST /api/v1/auth/admin/perms/sync` - Đồng bộ permissions

Xem chi tiết trong Swagger documentation: `http://localhost:3000/swagger/index.html`

## Troubleshooting

1. **Lỗi kết nối database:**
   - Kiểm tra PostgreSQL đã chạy chưa
   - Kiểm tra config trong `config/config.yaml`
   - Kiểm tra database `qc_thuan_nhien_db` đã được tạo chưa

2. **Lỗi "permission denied for schema auth":**
   - Chạy script grant permissions:
     ```bash
     psql -U postgres -d qc_thuan_nhien_db -f ../../TN-SYS-SQL/db/99-grant-permissions-simple.sql
     ```
   - Đảm bảo user trong config (`qc_thuan_nhien_app`) đã được grant quyền trên các schema: `core`, `auth`, `shell`

3. **Lỗi import packages:**
   - Chạy `go mod tidy` để download dependencies

4. **Lỗi port đã được sử dụng:**
   - Đổi port trong `config/config.yaml`
   - Hoặc kill process đang dùng port 3000
