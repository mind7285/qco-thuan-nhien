// 🇻🇳 Auth Handler
// 🇺🇸 Auth Handler
package handler

import (
	"tn-pos-sys-api/internal/model/auth"
	"tn-pos-sys-api/internal/service"
	"tn-pos-sys-api/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

// AuthHandler Auth handler
type AuthHandler struct {
	service *service.S_Api_Auth
}

// NewAuthHandler Tạo handler mới
func NewAuthHandler(s *service.S_Api_Auth) *AuthHandler {
	return &AuthHandler{service: s}
}

// Api_Auth_Usr_Login POST /auth/login
func (h *AuthHandler) Api_Auth_Usr_Login(c *fiber.Ctx) error {
	// Log X-Trial-Mode header nếu có (trước khi xử lý sâu hơn)
	trialMode := c.Get("X-Trial-Mode")
	if trialMode == "true" {
		utils.LogInfo("🔍 [TRIAL MODE] Login request with X-Trial-Mode header", map[string]interface{}{
			"ip": c.IP(),
		})
	}

	var req struct {
		UsrName string `json:"usrName" validate:"required"`
		Pwd     string `json:"pwd" validate:"required"`
	}

	if err := c.BodyParser(&req); err != nil {
		return utils.SendBadRequest(c, "Invalid request body")
	}

	loginIP := c.IP()
	ses, usr, err := h.service.Login(req.UsrName, req.Pwd, loginIP)
	if err != nil {
		return utils.SendUnauthorized(c, err.Error())
	}

	// Trả về session token và user info trong response, kèm thông tin chi nhánh mặc định
	return utils.SendSuccess(c, map[string]interface{}{
		"user":  usr,
		"token": ses.CSesToken,
		"branch": map[string]string{
			"id":   "9a1b2c3d-4e5f-6789-abcd-ef0123456789",
			"name": "Vũng Tàu",
		},
	})
}

// Api_Auth_Usr_Logout POST /auth/logout
func (h *AuthHandler) Api_Auth_Usr_Logout(c *fiber.Ctx) error {
	// Lấy token từ header
	token := c.Get("Authorization")
	if len(token) > 7 && token[:7] == "Bearer " {
		token = token[7:]
	}
	sesToken := token

	result, err := h.service.Logout(sesToken)
	if err != nil {
		return utils.SendInternalError(c, "Logout failed")
	}

	return utils.SendSuccess(c, result)
}

// Api_Auth_Usr_Register POST /auth/register
func (h *AuthHandler) Api_Auth_Usr_Register(c *fiber.Ctx) error {
	var usr auth.M_Tb_Auth_Usr

	if err := c.BodyParser(&usr); err != nil {
		return utils.SendBadRequest(c, "Invalid request body")
	}

	// Hash password
	if usr.CPwdHash != "" {
		hashedPwd, err := utils.HashPassword(usr.CPwdHash)
		if err != nil {
			return utils.SendInternalError(c, "Failed to hash password")
		}
		usr.CPwdHash = hashedPwd
	}

	usrID, err := h.service.Register(&usr)
	if err != nil {
		return utils.SendInternalError(c, "Register failed")
	}

	return utils.SendSuccess(c, map[string]string{"id": usrID})
}

// Api_Auth_Usr_Forgot_Pwd POST /auth/forgot-pwd
func (h *AuthHandler) Api_Auth_Usr_Forgot_Pwd(c *fiber.Ctx) error {
	var req struct {
		Email string `json:"email" validate:"required,email"`
	}

	if err := c.BodyParser(&req); err != nil {
		return utils.SendBadRequest(c, "Invalid request body")
	}

	result, err := h.service.ForgotPwd(req.Email)
	if err != nil {
		return utils.SendInternalError(c, "Failed to process request")
	}

	return utils.SendSuccess(c, result)
}

// Api_Auth_Usr_Change_Pwd POST /auth/change-pwd
func (h *AuthHandler) Api_Auth_Usr_Change_Pwd(c *fiber.Ctx) error {
	var req struct {
		OldPwd string `json:"oldPwd" validate:"required"`
		NewPwd string `json:"newPwd" validate:"required"`
	}

	if err := c.BodyParser(&req); err != nil {
		return utils.SendBadRequest(c, "Invalid request body")
	}

	// Lấy user ID từ context (từ middleware)
	usrID, ok := c.Locals("user_id").(string)
	if !ok || usrID == "" {
		return utils.SendUnauthorized(c, "User not authenticated")
	}

	// Gọi service với plain text passwords (service sẽ hash)
	result, err := h.service.ChangePwd(usrID, req.OldPwd, req.NewPwd)
	if err != nil {
		return utils.SendUnauthorized(c, err.Error())
	}

	return utils.SendSuccess(c, result)
}

// Api_Auth_Usr_Has_Perm GET /auth/has-perm/{permCode}
func (h *AuthHandler) Api_Auth_Usr_Has_Perm(c *fiber.Ctx) error {
	permCode := c.Params("permCode")

	// Lấy user ID từ context (từ middleware)
	usrID, ok := c.Locals("user_id").(string)
	if !ok || usrID == "" {
		return utils.SendUnauthorized(c, "User not authenticated")
	}

	result, err := h.service.HasPerm(usrID, permCode)
	if err != nil {
		return utils.SendInternalError(c, "Check permission failed")
	}

	return utils.SendSuccess(c, result)
}
