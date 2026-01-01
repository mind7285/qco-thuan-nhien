// 🇻🇳 Auth middleware
// 🇺🇸 Auth middleware
package middleware

import (
	"tn-pos-sys-api/internal/model/auth"
	"tn-pos-sys-api/pkg/utils"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// AuthMiddleware Middleware xác thực
func AuthMiddleware(db *gorm.DB) fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Lấy token từ header
		token := c.Get("Authorization")
		if token == "" {
			return utils.SendUnauthorized(c, "Missing authorization token")
		}

		// Loại bỏ "Bearer " prefix nếu có
		if len(token) > 7 && token[:7] == "Bearer " {
			token = token[7:]
		}

		// Kiểm tra session trong database
		var ses auth.M_Tb_Auth_Usr_Ses
		err := db.Where("c_ses_token = ? AND c_expired_at > ? AND q_is_deleted = ?",
			token,
			utils.GetCurrentTimeMs(),
			false,
		).First(&ses).Error

		if err != nil {
			return utils.SendUnauthorized(c, "Invalid or expired token")
		}

		// Lưu user ID vào context
		c.Locals("user_id", ses.CUsrID)
		c.Locals("session_id", ses.QID)

		return c.Next()
	}
}
