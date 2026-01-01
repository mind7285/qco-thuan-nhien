// 🇻🇳 Base Item Model với GUID và Sequence
// 🇺🇸 Base Item Model with GUID and Sequence
package model

// M_Db_Guid_Seq_Itm Base item với GUID ID và Sequence
type M_Db_Guid_Seq_Itm struct {
	M_Db_Guid_Itm
	QSeq int `json:"q_seq" gorm:"column:q_seq;default:1"`
}
