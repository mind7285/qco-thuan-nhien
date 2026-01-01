// 🇻🇳 Auth User Model
// 🇺🇸 Auth User Model
package auth

import "tn-pos-sys-api/internal/model"

// M_Tb_Auth_Usr User model
type M_Tb_Auth_Usr struct {
	model.M_Db_Guid_Seq_Itm
	CUsrName  string  `json:"c_usr_name" gorm:"column:c_usr_name;uniqueIndex;not null;size:64"`
	CPwdHash  string  `json:"c_pwd_hash" gorm:"column:c_pwd_hash;not null;size:256"`
	CFullName string  `json:"c_full_name" gorm:"column:c_full_name;not null;size:128"`
	CEmail    *string `json:"c_email,omitempty" gorm:"column:c_email;uniqueIndex;size:128"`
	CPhone    *string `json:"c_phone,omitempty" gorm:"column:c_phone;size:32"`
}

// TableName Tên bảng
func (M_Tb_Auth_Usr) TableName() string {
	return "auth.qtb_usr"
}
