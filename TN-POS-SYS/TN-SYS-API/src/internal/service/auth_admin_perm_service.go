// 🇻🇳 Auth Admin Permission Service
// 🇺🇸 Auth Admin Permission Service
package service

import (
	"tn-pos-sys-api/pkg/utils"

	"go.uber.org/zap"
	"gorm.io/gorm"
)

// S_Api_Auth_Adm_Perm Auth admin permission service
type S_Api_Auth_Adm_Perm struct {
	db     *gorm.DB
	logger *zap.Logger
}

// NewAuthAdminPermService Tạo service mới
func NewAuthAdminPermService(db *gorm.DB) *S_Api_Auth_Adm_Perm {
	return &S_Api_Auth_Adm_Perm{
		db:     db,
		logger: utils.GetLogger(),
	}
}

// Sync Đồng bộ quyền từ code
func (s *S_Api_Auth_Adm_Perm) Sync() (bool, error) {
	// TODO: Quét code để thu thập quyền hạn
	// Tạm thời return true
	s.logger.Info("Permission sync called")
	return true, nil
}

// GetList Lấy danh sách permissions theo module
func (s *S_Api_Auth_Adm_Perm) GetList() ([]map[string]interface{}, error) {
	var results []map[string]interface{}

	err := s.db.Raw("SELECT * FROM auth.qfn_perm_get_list()").Scan(&results).Error
	if err != nil {
		s.logger.Error("Failed to get permission list", zap.Error(err))
		return nil, err
	}

	return results, nil
}
