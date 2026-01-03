// 🇻🇳 Organization Company Model
// 🇺🇸 Organization Company Model
package org

import (
	"tn-pos-sys-api/internal/model"

	"github.com/google/uuid"
)

// M_Tb_Org_Cpy Company model
type M_Tb_Org_Cpy struct {
	model.M_Db_Guid_Seq_Itm
	CCpyName  string     `json:"c_cpy_name" gorm:"column:c_cpy_name;not null;size:256"`
	CTaxCode  *string    `json:"c_tax_code,omitempty" gorm:"column:c_tax_code;size:64"`
	CParentId *uuid.UUID `json:"c_parent_id,omitempty" gorm:"column:c_parent_id"`
}

// TableName Tên bảng
func (M_Tb_Org_Cpy) TableName() string {
	return "org.qtb_cpy"
}
