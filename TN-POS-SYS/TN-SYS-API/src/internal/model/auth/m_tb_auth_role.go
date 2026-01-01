// 🇻🇳 Auth Role Model
// 🇺🇸 Auth Role Model
package auth

import "tn-pos-sys-api/internal/model"

// M_Tb_Auth_Role Role model
type M_Tb_Auth_Role struct {
	model.M_Db_Guid_Seq_Itm
	CRoleName string `json:"c_role_name" gorm:"column:c_role_name;not null;size:128"`
	CRoleCode string `json:"c_role_code" gorm:"column:c_role_code;uniqueIndex;not null;size:64"`
}

// TableName Tên bảng
func (M_Tb_Auth_Role) TableName() string {
	return "auth.qtb_role"
}
