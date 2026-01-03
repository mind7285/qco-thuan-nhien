// 🇻🇳 Organization Handler
// 🇺🇸 Organization Handler
package handler

import (
	"tn-pos-sys-api/internal/model/org"
	"tn-pos-sys-api/internal/service"
	"tn-pos-sys-api/pkg/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// OrgHandler Organization handler
type OrgHandler struct {
	service *service.S_Api_Org
}

// NewOrgHandler Tạo handler mới
func NewOrgHandler(s *service.S_Api_Org) *OrgHandler {
	return &OrgHandler{service: s}
}

// Api_Org_Get_Hierarchy GET /org/hierarchy
func (h *OrgHandler) Api_Org_Get_Hierarchy(c *fiber.Ctx) error {
	result, err := h.service.GetHierarchy()
	if err != nil {
		return utils.SendInternalError(c, err.Error())
	}
	return utils.SendSuccess(c, result)
}

// Api_Org_Get_Companies GET /org/companies
func (h *OrgHandler) Api_Org_Get_Companies(c *fiber.Ctx) error {
	result, err := h.service.GetCompanies()
	if err != nil {
		return utils.SendInternalError(c, err.Error())
	}
	return utils.SendSuccess(c, result)
}

// Api_Org_Cpy_Upsert POST /org/companies
func (h *OrgHandler) Api_Org_Cpy_Upsert(c *fiber.Ctx) error {
	var req org.M_Tb_Org_Cpy
	if err := c.BodyParser(&req); err != nil {
		return utils.SendBadRequest(c, "Invalid request body")
	}
	id, err := h.service.CpyUpsert(&req, "API", uuid.Nil)
	if err != nil {
		return utils.SendInternalError(c, err.Error())
	}
	return utils.SendSuccess(c, id)
}

// Api_Org_Get_Regions GET /org/regions
func (h *OrgHandler) Api_Org_Get_Regions(c *fiber.Ctx) error {
	result, err := h.service.GetRegions()
	if err != nil {
		return utils.SendInternalError(c, err.Error())
	}
	return utils.SendSuccess(c, result)
}

// Api_Org_Reg_Upsert POST /org/regions
func (h *OrgHandler) Api_Org_Reg_Upsert(c *fiber.Ctx) error {
	var req org.M_Tb_Org_Reg
	if err := c.BodyParser(&req); err != nil {
		return utils.SendBadRequest(c, "Invalid request body")
	}
	id, err := h.service.RegUpsert(&req, "API", uuid.Nil)
	if err != nil {
		return utils.SendInternalError(c, err.Error())
	}
	return utils.SendSuccess(c, id)
}

// Api_Org_Get_Branches GET /org/branches
func (h *OrgHandler) Api_Org_Get_Branches(c *fiber.Ctx) error {
	result, err := h.service.GetBranches()
	if err != nil {
		return utils.SendInternalError(c, err.Error())
	}
	return utils.SendSuccess(c, result)
}

// Api_Org_Brh_Upsert POST /org/branches
func (h *OrgHandler) Api_Org_Brh_Upsert(c *fiber.Ctx) error {
	var req org.M_Tb_Org_Brh
	if err := c.BodyParser(&req); err != nil {
		return utils.SendBadRequest(c, "Invalid request body")
	}
	id, err := h.service.BrhUpsert(&req, "API", uuid.Nil)
	if err != nil {
		return utils.SendInternalError(c, err.Error())
	}
	return utils.SendSuccess(c, id)
}

// Api_Org_Get_Departments GET /org/departments
func (h *OrgHandler) Api_Org_Get_Departments(c *fiber.Ctx) error {
	result, err := h.service.GetDepartments()
	if err != nil {
		return utils.SendInternalError(c, err.Error())
	}
	return utils.SendSuccess(c, result)
}

// Api_Org_Dep_Upsert POST /org/departments
func (h *OrgHandler) Api_Org_Dep_Upsert(c *fiber.Ctx) error {
	var req org.M_Tb_Org_Dep
	if err := c.BodyParser(&req); err != nil {
		return utils.SendBadRequest(c, "Invalid request body")
	}
	id, err := h.service.DepUpsert(&req, "API", uuid.Nil)
	if err != nil {
		return utils.SendInternalError(c, err.Error())
	}
	return utils.SendSuccess(c, id)
}

// Api_Org_Entity_Delete DELETE /org/:table/:id
func (h *OrgHandler) Api_Org_Entity_Delete(c *fiber.Ctx) error {
	table := c.Params("table")
	idStr := c.Params("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		return utils.SendBadRequest(c, "Invalid ID")
	}
	success, err := h.service.EntityDelete("qtb_"+table, id, "API", uuid.Nil)
	if err != nil {
		return utils.SendInternalError(c, err.Error())
	}
	return utils.SendSuccess(c, success)
}

// Api_Org_Usr_Brh_Get GET /org/user-branch/:usrId
func (h *OrgHandler) Api_Org_Usr_Brh_Get(c *fiber.Ctx) error {
	usrIdStr := c.Params("usrId")
	usrId, err := uuid.Parse(usrIdStr)
	if err != nil {
		return utils.SendBadRequest(c, "Invalid user ID")
	}

	result, err := h.service.GetUserBranches(usrId)
	if err != nil {
		return utils.SendInternalError(c, err.Error())
	}
	return utils.SendSuccess(c, result)
}

// Api_Org_Usr_Brh_Assign POST /org/user-branch/assign
func (h *OrgHandler) Api_Org_Usr_Brh_Assign(c *fiber.Ctx) error {
	var req org.M_Tb_Org_Usr_Brh
	if err := c.BodyParser(&req); err != nil {
		return utils.SendBadRequest(c, "Invalid request body")
	}

	// Lấy user thực hiện từ context (nếu có middleware auth)
	// TODO: Lấy q_id của admin đang thực hiện
	adminId := uuid.Nil

	err := h.service.AssignUserToBranch(req.CUsrId, req.CBrhId, req.CIsDefault, "API_Assign", adminId)
	if err != nil {
		return utils.SendInternalError(c, err.Error())
	}
	return utils.SendSuccess(c, true)
}
