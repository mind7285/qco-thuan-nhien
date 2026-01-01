# TN POS System - Web Application

Ứng dụng web cho TN POS System được viết bằng TypeScript và LitElement (Web Components).

## Yêu cầu

- Node.js >= 18.0.0
- npm hoặc yarn hoặc pnpm
- Go API server đang chạy (mặc định: http://localhost:3000)

## Cài đặt

1. **Cài đặt dependencies:**
```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

## Chạy ứng dụng

### Development
```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
```

Ứng dụng sẽ chạy tại: http://localhost:3001

### Build
```bash
npm run build
```

Build output sẽ nằm trong thư mục `dist/`.

### Preview production build
```bash
npm run preview
```

### Type checking
```bash
npm run type-check
```

## Cấu trúc Project

```
src/
├── core/              # Core utilities
│   ├── api/          # API client
│   ├── models/       # Base models
│   └── router/       # Router implementation
├── features/         # Feature modules
│   ├── auth/         # Auth module
│   │   ├── data/     # Models
│   │   ├── services/ # API services
│   │   └── ui/       # UI screens & logic
│   └── shell/        # Shell module
│       ├── data/
│       ├── services/
│       └── ui/
└── main.ts           # Entry point
```

## Routes

### Public Routes
- `/auth/login` - Đăng nhập
- `/auth/register` - Đăng ký
- `/auth/forgot-pwd` - Quên mật khẩu

### Protected Routes (Auth Required)
- `/home` - Trang chủ (Shell)

## Cấu hình API

Mặc định, API client sẽ sử dụng `window.location.origin` làm base URL. 

Nếu API server chạy trên port khác (ví dụ: http://localhost:3000), bạn có thể cấu hình trong `src/core/api/api_client.ts`:

```typescript
const apiClient = new Api_Client('http://localhost:3000');
```

## Technologies

- **LitElement**: Web Components framework
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool và dev server
- **Native Web APIs**: Fetch API, History API

## Troubleshooting

1. **Lỗi "Cannot find module":**
   - Chạy `npm install` để cài đặt dependencies

2. **Lỗi kết nối API:**
   - Đảm bảo API server đang chạy
   - Kiểm tra base URL trong `api_client.ts`

3. **Lỗi TypeScript:**
   - Chạy `npm run type-check` để kiểm tra lỗi
   - Đảm bảo `tsconfig.json` được cấu hình đúng

