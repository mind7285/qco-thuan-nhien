// 🇻🇳 Auth User Session Model
// 🇺🇸 Auth User Session Model
package auth

import "tn-pos-sys-api/internal/model"

// M_Tb_Auth_Usr_Ses User session model
type M_Tb_Auth_Usr_Ses struct {
	model.M_Db_Guid_Itm
	CUsrID     string  `json:"c_usr_id" gorm:"column:c_usr_id;not null;type:uuid;index"`
	CSesToken  string  `json:"c_ses_token" gorm:"column:c_ses_token;uniqueIndex;not null;size:256"`
	CExpiredAt int64   `json:"c_expired_at" gorm:"column:c_expired_at;not null"`
	CLoginIP   *string `json:"c_login_ip,omitempty" gorm:"column:c_login_ip;size:64"`
}

// TableName Tên bảng
func (M_Tb_Auth_Usr_Ses) TableName() string {
	return "auth.qtb_usr_ses"
}
