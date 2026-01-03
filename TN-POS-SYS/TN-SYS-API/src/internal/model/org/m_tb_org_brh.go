// 🇻🇳 Organization Branch Model
// 🇺🇸 Organization Branch Model
package org

import (
	"tn-pos-sys-api/internal/model"

	"github.com/google/uuid"
)

// M_Tb_Org_Brh Branch model
type M_Tb_Org_Brh struct {
	model.M_Db_Guid_Seq_Itm
	CRegId   uuid.UUID `json:"c_reg_id" gorm:"column:c_reg_id;not null"`
	CBrhName string    `json:"c_brh_name" gorm:"column:c_brh_name;not null;size:128"`
	CAddress *string   `json:"c_address,omitempty" gorm:"column:c_address"`
	CPhone   *string   `json:"c_phone,omitempty" gorm:"column:c_phone;size:32"`
}

// TableName Tên bảng
func (M_Tb_Org_Brh) TableName() string {
	return "org.qtb_brh"
}
