// 🇻🇳 Organization Department Model
// 🇺🇸 Organization Department Model
package org

import (
	"tn-pos-sys-api/internal/model"

	"github.com/google/uuid"
)

// M_Tb_Org_Dep Department model
type M_Tb_Org_Dep struct {
	model.M_Db_Guid_Seq_Itm
	CBrhId   uuid.UUID `json:"c_brh_id" gorm:"column:c_brh_id;not null"`
	CDepName string    `json:"c_dep_name" gorm:"column:c_dep_name;not null;size:128"`
}

// TableName Tên bảng
func (M_Tb_Org_Dep) TableName() string {
	return "org.qtb_dep"
}
