// 🇻🇳 Organization User Branch Link Model
// 🇺🇸 Organization User Branch Link Model
package org

import (
	"tn-pos-sys-api/internal/model"

	"github.com/google/uuid"
)

// M_Tb_Org_Usr_Brh User Branch link model
type M_Tb_Org_Usr_Brh struct {
	model.M_Db_Ett
	CUsrId     uuid.UUID `json:"c_usr_id" gorm:"column:c_usr_id;primaryKey"`
	CBrhId     uuid.UUID `json:"c_brh_id" gorm:"column:c_brh_id;primaryKey"`
	CIsDefault bool      `json:"c_is_default" gorm:"column:c_is_default;default:false"`
}

// TableName Tên bảng
func (M_Tb_Org_Usr_Brh) TableName() string {
	return "org.qtb_usr_brh"
}
