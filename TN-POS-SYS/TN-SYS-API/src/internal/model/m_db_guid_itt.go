// 🇻🇳 Base Item Model với GUID
// 🇺🇸 Base Item Model with GUID
package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// M_Db_Guid_Itm Base item với GUID ID
type M_Db_Guid_Itm struct {
	QID string `json:"q_id" gorm:"column:q_id;type:uuid;primaryKey;default:gen_random_uuid()"`
	M_Db_Ett
}

// BeforeCreate hook để generate UUID nếu chưa có
// Note: Cần implement GORM hook interface nếu muốn tự động
func (m *M_Db_Guid_Itm) BeforeCreate(tx *gorm.DB) error {
	if m.QID == "" {
		m.QID = uuid.New().String()
	}
	return nil
}
