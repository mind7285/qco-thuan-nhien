// 🇻🇳 Password utilities
// 🇺🇸 Password utilities
package utils

import (
	"crypto/rand"
	"encoding/hex"

	"golang.org/x/crypto/bcrypt"
)

// HashPassword Hash mật khẩu
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// CheckPassword Kiểm tra mật khẩu
func CheckPassword(password, hash string) bool {
	// Kiểm tra hash có đúng format bcrypt không (bắt đầu bằng $2a$ hoặc $2b$)
	if len(hash) < 7 || (hash[:4] != "$2a$" && hash[:4] != "$2b$" && hash[:4] != "$2y$") {
		return false
	}
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// GenerateRandomToken Tạo random token (hex string)
// length: số bytes (sẽ tạo string hex có độ dài = length * 2)
func GenerateRandomToken(length int) string {
	bytes := make([]byte, length)
	if _, err := rand.Read(bytes); err != nil {
		// Fallback: nếu rand.Read lỗi, dùng timestamp + random
		panic("Failed to generate random token: " + err.Error())
	}
	return hex.EncodeToString(bytes)
}
