// 🇻🇳 Shell Handler
// 🇺🇸 Shell Handler
package handler

import (
	"tn-pos-sys-api/internal/service"
	"tn-pos-sys-api/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

// ShellHandler Shell handler
type ShellHandler struct {
	service *service.S_Api_Shell
}

// NewShellHandler Tạo handler mới
func NewShellHandler(s *service.S_Api_Shell) *ShellHandler {
	return &ShellHandler{service: s}
}

// Api_Shell_Mod_Get_Registry GET /shell/registry
func (h *ShellHandler) Api_Shell_Mod_Get_Registry(c *fiber.Ctx) error {
	modules, err := h.service.GetRegistry()
	if err != nil {
		return utils.SendInternalError(c, "Failed to get registry")
	}

	return utils.SendSuccess(c, modules)
}

// Api_Shell_Sys_Get_Cfg GET /shell/config
func (h *ShellHandler) Api_Shell_Sys_Get_Cfg(c *fiber.Ctx) error {
	cfg := h.service.GetSysCfg()
	return utils.SendSuccess(c, cfg)
}
