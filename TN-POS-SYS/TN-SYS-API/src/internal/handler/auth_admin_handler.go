// 🇻🇳 Auth Admin Handler
// 🇺🇸 Auth Admin Handler
package handler

import (
	"tn-pos-sys-api/internal/model/auth"
	"tn-pos-sys-api/internal/service"
	"tn-pos-sys-api/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

// AuthAdminHandler Auth admin handler
type AuthAdminHandler struct {
	usrService  *service.S_Api_Auth_Adm_Usr
	roleService *service.S_Api_Auth_Adm_Role
	permService *service.S_Api_Auth_Adm_Perm
}

// NewAuthAdminHandler Tạo handler mới
func NewAuthAdminHandler(
	usrService *service.S_Api_Auth_Adm_Usr,
	roleService *service.S_Api_Auth_Adm_Role,
	permService *service.S_Api_Auth_Adm_Perm,
) *AuthAdminHandler {
	return &AuthAdminHandler{
		usrService:  usrService,
		roleService: roleService,
		permService: permService,
	}
}

// Api_Auth_Usr_Get_List GET /auth/admin/users
func (h *AuthAdminHandler) Api_Auth_Usr_Get_List(c *fiber.Ctx) error {
	users, err := h.usrService.GetList()
	if err != nil {
		return utils.SendInternalError(c, "Failed to get user list")
	}

	return utils.SendSuccess(c, users)
}

// Api_Auth_Usr_Upsert POST /auth/admin/users
func (h *AuthAdminHandler) Api_Auth_Usr_Upsert(c *fiber.Ctx) error {
	var usr auth.M_Tb_Auth_Usr

	if err := c.BodyParser(&usr); err != nil {
		return utils.SendBadRequest(c, "Invalid request body")
	}

	usrID, err := h.usrService.Upsert(&usr)
	if err != nil {
		return utils.SendInternalError(c, "Failed to upsert user")
	}

	return utils.SendSuccess(c, map[string]string{"id": usrID})
}

// Api_Auth_Usr_Delete DELETE /auth/admin/users/:id
func (h *AuthAdminHandler) Api_Auth_Usr_Delete(c *fiber.Ctx) error {
	usrID := c.Params("id")

	result, err := h.usrService.Delete(usrID)
	if err != nil {
		return utils.SendInternalError(c, "Failed to delete user")
	}

	return utils.SendSuccess(c, result)
}

// Api_Auth_Role_Get_List GET /auth/admin/roles
func (h *AuthAdminHandler) Api_Auth_Role_Get_List(c *fiber.Ctx) error {
	roles, err := h.roleService.GetList()
	if err != nil {
		return utils.SendInternalError(c, "Failed to get role list")
	}

	return utils.SendSuccess(c, roles)
}

// Api_Auth_Role_Upsert POST /auth/admin/roles
func (h *AuthAdminHandler) Api_Auth_Role_Upsert(c *fiber.Ctx) error {
	var role auth.M_Tb_Auth_Role

	if err := c.BodyParser(&role); err != nil {
		return utils.SendBadRequest(c, "Invalid request body")
	}

	roleID, err := h.roleService.Upsert(&role)
	if err != nil {
		return utils.SendInternalError(c, "Failed to upsert role")
	}

	return utils.SendSuccess(c, map[string]string{"id": roleID})
}

// Api_Auth_Role_Delete DELETE /auth/admin/roles/:id
func (h *AuthAdminHandler) Api_Auth_Role_Delete(c *fiber.Ctx) error {
	roleID := c.Params("id")

	result, err := h.roleService.Delete(roleID)
	if err != nil {
		return utils.SendInternalError(c, "Failed to delete role")
	}

	return utils.SendSuccess(c, result)
}

// Api_Auth_Role_Perm_Save POST /auth/admin/roles/perms
func (h *AuthAdminHandler) Api_Auth_Role_Perm_Save(c *fiber.Ctx) error {
	var req struct {
		RoleID string              `json:"roleId" validate:"required"`
		Perms  []map[string]string `json:"perms" validate:"required"`
	}

	if err := c.BodyParser(&req); err != nil {
		return utils.SendBadRequest(c, "Invalid request body")
	}

	result, err := h.roleService.SavePerms(req.RoleID, req.Perms)
	if err != nil {
		return utils.SendInternalError(c, "Failed to save role permissions")
	}

	return utils.SendSuccess(c, result)
}

// Api_Auth_Perm_Sync POST /auth/admin/perms/sync
func (h *AuthAdminHandler) Api_Auth_Perm_Sync(c *fiber.Ctx) error {
	result, err := h.permService.Sync()
	if err != nil {
		return utils.SendInternalError(c, "Failed to sync permissions")
	}

	return utils.SendSuccess(c, result)
}

// Api_Auth_Perm_Get_List GET /auth/admin/perms
func (h *AuthAdminHandler) Api_Auth_Perm_Get_List(c *fiber.Ctx) error {
	perms, err := h.permService.GetList()
	if err != nil {
		return utils.SendInternalError(c, "Failed to get permission list")
	}

	return utils.SendSuccess(c, perms)
}
