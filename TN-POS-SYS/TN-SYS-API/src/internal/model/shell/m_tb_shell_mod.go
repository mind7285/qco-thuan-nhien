// 🇻🇳 Shell Module Model
// 🇺🇸 Shell Module Model
package shell

import "tn-pos-sys-api/internal/model"

// M_Tb_Shell_Mod Module registry model
type M_Tb_Shell_Mod struct {
	CModID    string  `json:"c_mod_id" gorm:"column:c_mod_id;primaryKey"`
	CTitle    string  `json:"c_title" gorm:"column:c_title;not null"`
	CIcon     string  `json:"c_icon" gorm:"column:c_icon"`
	CParentID *string `json:"c_parent_id" gorm:"column:c_parent_id"`
	CRoute    string  `json:"c_route" gorm:"column:c_route;not null"`
	COrder    int     `json:"c_order" gorm:"column:c_order;default:0"`
	model.M_Db_Ett
}

// TableName Tên bảng
func (M_Tb_Shell_Mod) TableName() string {
	return "shell.qtb_shell_mod"
}
