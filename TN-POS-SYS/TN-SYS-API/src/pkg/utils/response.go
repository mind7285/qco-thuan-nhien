// 🇻🇳 Response utilities
// 🇺🇸 Response utilities
package utils

import (
	"tn-pos-sys-api/internal/model"

	"github.com/gofiber/fiber/v2"
)

// SendSuccess Gửi response thành công
func SendSuccess(c *fiber.Ctx, data interface{}) error {
	return c.JSON(model.NewSuccessResponse(data))
}

// SendError Gửi response lỗi
func SendError(c *fiber.Ctx, code int, message string) error {
	return c.Status(code).JSON(model.NewErrorResponse(code, message))
}

// SendBadRequest Gửi response Bad Request
func SendBadRequest(c *fiber.Ctx, message string) error {
	return SendError(c, fiber.StatusBadRequest, message)
}

// SendUnauthorized Gửi response Unauthorized
func SendUnauthorized(c *fiber.Ctx, message string) error {
	return SendError(c, fiber.StatusUnauthorized, message)
}

// SendInternalError Gửi response Internal Server Error
func SendInternalError(c *fiber.Ctx, message string) error {
	return SendError(c, fiber.StatusInternalServerError, message)
}
