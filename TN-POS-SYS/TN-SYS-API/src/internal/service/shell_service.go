// 🇻🇳 Shell Service
// 🇺🇸 Shell Service
package service

import (
	"tn-pos-sys-api/internal/model/shell"
	"tn-pos-sys-api/pkg/utils"

	"go.uber.org/zap"
	"gorm.io/gorm"
)

// S_Api_Shell Shell service
type S_Api_Shell struct {
	db     *gorm.DB
	logger *zap.Logger
}

// NewShellService Tạo service mới
func NewShellService(db *gorm.DB) *S_Api_Shell {
	return &S_Api_Shell{
		db:     db,
		logger: utils.GetLogger(),
	}
}

// GetRegistry Lấy danh sách modules từ registry
func (s *S_Api_Shell) GetRegistry() ([]shell.M_Tb_Shell_Mod, error) {
	var modules []shell.M_Tb_Shell_Mod

	err := s.db.
		Where("q_is_deleted = ? AND q_status = ?", false, 1).
		Order("c_order ASC").
		Find(&modules).Error

	if err != nil {
		s.logger.Error("Failed to get registry", zap.Error(err))
		return nil, err
	}

	return modules, nil
}

// GetSysCfg Lấy cấu hình hệ thống
func (s *S_Api_Shell) GetSysCfg() map[string]interface{} {
	return map[string]interface{}{
		"app_name": "TN POS System",
		"version":  "1.0.0",
		"theme":    "default",
	}
}
