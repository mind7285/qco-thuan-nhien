// 🇻🇳 Auth Admin Role Service
// 🇺🇸 Auth Admin Role Service
package service

import (
	"encoding/json"
	"tn-pos-sys-api/internal/model/auth"
	"tn-pos-sys-api/pkg/utils"

	"go.uber.org/zap"
	"gorm.io/gorm"
)

// S_Api_Auth_Adm_Role Auth admin role service
type S_Api_Auth_Adm_Role struct {
	db     *gorm.DB
	logger *zap.Logger
}

// NewAuthAdminRoleService Tạo service mới
func NewAuthAdminRoleService(db *gorm.DB) *S_Api_Auth_Adm_Role {
	return &S_Api_Auth_Adm_Role{
		db:     db,
		logger: utils.GetLogger(),
	}
}

// GetList Lấy danh sách roles
func (s *S_Api_Auth_Adm_Role) GetList() ([]auth.M_Tb_Auth_Role, error) {
	var roles []auth.M_Tb_Auth_Role

	err := s.db.Raw("SELECT * FROM auth.qfn_role_get_list()").Find(&roles).Error
	if err != nil {
		s.logger.Error("Failed to get role list", zap.Error(err))
		return nil, err
	}

	return roles, nil
}

// Upsert Thêm/sửa role
func (s *S_Api_Auth_Adm_Role) Upsert(role *auth.M_Tb_Auth_Role) (string, error) {
	var roleID string

	// Nếu QID rỗng thì dùng NULL
	var roleIDParam interface{} = nil
	if role.QID != "" {
		roleIDParam = role.QID
	}

	err := s.db.Raw(
		"SELECT auth.qsp_role_upsert($1, $2, $3, $4, $5)",
		roleIDParam,
		role.CRoleName,
		role.CRoleCode,
		"API",
		nil, // p_by
	).Scan(&roleID).Error

	if err != nil {
		s.logger.Error("Failed to upsert role", zap.Error(err))
		return "", err
	}

	return roleID, nil
}

// Delete Xóa role (soft delete)
func (s *S_Api_Auth_Adm_Role) Delete(roleID string) (bool, error) {
	var result bool
	err := s.db.Raw(
		"SELECT auth.qsp_role_delete($1, $2, $3)",
		roleID,
		"API",
		nil, // p_by
	).Scan(&result).Error

	if err != nil {
		s.logger.Error("Failed to delete role", zap.Error(err))
		return false, err
	}

	return result, nil
}

// SavePerms Lưu phân quyền cho role
func (s *S_Api_Auth_Adm_Role) SavePerms(roleID string, perms []map[string]string) (bool, error) {
	// Convert perms to JSONB
	permsJSON, err := json.Marshal(perms)
	if err != nil {
		s.logger.Error("Failed to marshal perms", zap.Error(err))
		return false, err
	}

	var result bool
	err = s.db.Raw(
		"SELECT auth.qsp_role_perm_save($1, $2::jsonb, $3, $4)",
		roleID,
		string(permsJSON),
		"API",
		nil, // p_by
	).Scan(&result).Error

	if err != nil {
		s.logger.Error("Failed to save role perms", zap.Error(err))
		return false, err
	}

	return result, nil
}
