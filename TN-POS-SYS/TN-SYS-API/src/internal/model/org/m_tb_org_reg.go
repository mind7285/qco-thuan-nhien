// 🇻🇳 Organization Region Model
// 🇺🇸 Organization Region Model
package org

import (
	"tn-pos-sys-api/internal/model"

	"github.com/google/uuid"
)

// M_Tb_Org_Reg Region model
type M_Tb_Org_Reg struct {
	model.M_Db_Guid_Seq_Itm
	CCpyId   uuid.UUID `json:"c_cpy_id" gorm:"column:c_cpy_id;not null"`
	CRegName string    `json:"c_reg_name" gorm:"column:c_reg_name;not null;size:128"`
}

// TableName Tên bảng
func (M_Tb_Org_Reg) TableName() string {
	return "org.qtb_reg"
}
