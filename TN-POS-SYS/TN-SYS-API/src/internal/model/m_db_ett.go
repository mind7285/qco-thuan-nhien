// 🇻🇳 Base Entity Model
// 🇺🇸 Base Entity Model
package model

// M_Db_Ett Base entity với metadata
type M_Db_Ett struct {
	QStatus      int    `json:"q_status" gorm:"column:q_status;default:1"`
	QVersion     int    `json:"q_version" gorm:"column:q_version;default:0"`
	QIsDeleted   bool   `json:"q_is_deleted" gorm:"column:q_is_deleted;default:false"`
	QCreatedVia  string `json:"q_created_via,omitempty" gorm:"column:q_created_via"`
	QCreatedAt   int64  `json:"q_created_at" gorm:"column:q_created_at"`
	QCreatedBy   string `json:"q_created_by,omitempty" gorm:"column:q_created_by;type:uuid"`
	QUpdatedVia  string `json:"q_updated_via,omitempty" gorm:"column:q_updated_via"`
	QUpdatedAt   int64  `json:"q_updated_at" gorm:"column:q_updated_at"`
	QUpdatedBy   string `json:"q_updated_by,omitempty" gorm:"column:q_updated_by;type:uuid"`
	QUpdatedNote string `json:"q_updated_note,omitempty" gorm:"column:q_updated_note"`
	QDeletedVia  string `json:"q_deleted_via,omitempty" gorm:"column:q_deleted_via"`
	QDeletedAt   *int64 `json:"q_deleted_at,omitempty" gorm:"column:q_deleted_at"`
	QDeletedBy   string `json:"q_deleted_by,omitempty" gorm:"column:q_deleted_by;type:uuid"`
	QDeletedNote string `json:"q_deleted_note,omitempty" gorm:"column:q_deleted_note"`
}
