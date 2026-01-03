# 1. Sử dụng image Debian slim để giữ dung lượng nhẹ và ổn định
FROM debian:bookworm-slim

# 2. Cài đặt các thư viện cần thiết cho mạng và múi giờ
RUN apt-get update && apt-get install -y ca-certificates tzdata && rm -rf /var/lib/apt/lists/*

# 3. Thiết lập múi giờ Việt Nam
ENV TZ=Asia/Ho_Chi_Minh

# 4. Tạo thư mục ứng dụng
WORKDIR /app

# 5. Copy file binary tn-api từ máy Mac (local) vào container
# Lưu ý: File này phải được build bằng lệnh:
# GOOS=linux GOARCH=amd64 go build -o tn-api ./cmd/server/main.go
COPY tn-api .

# 6. Copy thư mục config (chứa file config.yaml)
COPY config/ ./config/

# 7. Cấp quyền thực thi cho ứng dụng
RUN chmod +x tn-api

# 8. Mở port 3000 (theo file config.yaml)
EXPOSE 3000

# 9. Lệnh chạy ứng dụng
CMD ["./tn-api"]

