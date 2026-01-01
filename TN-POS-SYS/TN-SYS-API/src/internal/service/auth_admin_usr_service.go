// 🇻🇳 Auth Admin User Service
// 🇺🇸 Auth Admin User Service
package service

import (
	"tn-pos-sys-api/internal/model/auth"
	"tn-pos-sys-api/pkg/utils"

	"go.uber.org/zap"
	"gorm.io/gorm"
)

// S_Api_Auth_Adm_Usr Auth admin user service
type S_Api_Auth_Adm_Usr struct {
	db     *gorm.DB
	logger *zap.Logger
}

// NewAuthAdminUsrService Tạo service mới
func NewAuthAdminUsrService(db *gorm.DB) *S_Api_Auth_Adm_Usr {
	return &S_Api_Auth_Adm_Usr{
		db:     db,
		logger: utils.GetLogger(),
	}
}

// GetList Lấy danh sách users
func (s *S_Api_Auth_Adm_Usr) GetList() ([]auth.M_Tb_Auth_Usr, error) {
	var users []auth.M_Tb_Auth_Usr

	err := s.db.Raw("SELECT * FROM auth.qfn_usr_get_list()").Find(&users).Error
	if err != nil {
		s.logger.Error("Failed to get user list", zap.Error(err))
		return nil, err
	}

	return users, nil
}

// Upsert Thêm/sửa user
func (s *S_Api_Auth_Adm_Usr) Upsert(usr *auth.M_Tb_Auth_Usr) (string, error) {
	var usrID string

	// Nếu QID rỗng thì dùng NULL
	var usrIDParam interface{} = nil
	if usr.QID != "" {
		usrIDParam = usr.QID
	}

	err := s.db.Raw(
		"SELECT auth.qsp_usr_upsert($1, $2, $3, $4, $5, $6, $7, $8)",
		usrIDParam,
		usr.CUsrName,
		usr.CPwdHash,
		usr.CFullName,
		usr.CEmail,
		usr.CPhone,
		"API",
		nil, // p_by
	).Scan(&usrID).Error

	if err != nil {
		s.logger.Error("Failed to upsert user", zap.Error(err))
		return "", err
	}

	return usrID, nil
}

// Delete Xóa user (soft delete)
func (s *S_Api_Auth_Adm_Usr) Delete(usrID string) (bool, error) {
	var result bool
	err := s.db.Raw(
		"SELECT auth.qsp_usr_delete($1, $2, $3)",
		usrID,
		"API",
		nil, // p_by
	).Scan(&result).Error

	if err != nil {
		s.logger.Error("Failed to delete user", zap.Error(err))
		return false, err
	}

	return result, nil
}
