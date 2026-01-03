// 🇻🇳 Organization Service
// 🇺🇸 Organization Service
package service

import (
	"tn-pos-sys-api/internal/model/org"
	"tn-pos-sys-api/pkg/utils"

	"github.com/google/uuid"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

// S_Api_Org Organization service
type S_Api_Org struct {
	db     *gorm.DB
	logger *zap.Logger
}

// NewOrgService Tạo service mới
func NewOrgService(db *gorm.DB) *S_Api_Org {
	return &S_Api_Org{
		db:     db,
		logger: utils.GetLogger(),
	}
}

// GetHierarchy Lấy toàn bộ sơ đồ tổ chức
func (s *S_Api_Org) GetHierarchy() (interface{}, error) {
	// Lấy tất cả dữ liệu từ 4 bảng
	var companies []org.M_Tb_Org_Cpy
	var regions []org.M_Tb_Org_Reg
	var branches []org.M_Tb_Org_Brh
	var departments []org.M_Tb_Org_Dep

	if err := s.db.Where("q_is_deleted = ?", false).Order("c_cpy_name").Find(&companies).Error; err != nil {
		return nil, err
	}
	if err := s.db.Where("q_is_deleted = ?", false).Order("c_reg_name").Find(&regions).Error; err != nil {
		return nil, err
	}
	if err := s.db.Where("q_is_deleted = ?", false).Order("c_brh_name").Find(&branches).Error; err != nil {
		return nil, err
	}
	if err := s.db.Where("q_is_deleted = ?", false).Order("c_dep_name").Find(&departments).Error; err != nil {
		return nil, err
	}

	// Build tree structure
	type depNode struct {
		ID   string `json:"id"`
		Name string `json:"name"`
		Type string `json:"type"`
	}
	type brhNode struct {
		ID       string    `json:"id"`
		Name     string    `json:"name"`
		Type     string    `json:"type"`
		Children []depNode `json:"children"`
	}
	type regNode struct {
		ID       string    `json:"id"`
		Name     string    `json:"name"`
		Type     string    `json:"type"`
		Children []brhNode `json:"children"`
	}
	type cpyNode struct {
		ID       string    `json:"id"`
		Name     string    `json:"name"`
		Type     string    `json:"type"`
		Children []regNode `json:"children"`
	}

	tree := make([]cpyNode, 0)

	for _, c := range companies {
		cN := cpyNode{ID: c.QID, Name: c.CCpyName, Type: "CPY", Children: make([]regNode, 0)}
		for _, r := range regions {
			if r.CCpyId.String() == c.QID {
				rN := regNode{ID: r.QID, Name: r.CRegName, Type: "REG", Children: make([]brhNode, 0)}
				for _, b := range branches {
					if b.CRegId.String() == r.QID {
						bN := brhNode{ID: b.QID, Name: b.CBrhName, Type: "BRH", Children: make([]depNode, 0)}
						for _, d := range departments {
							if d.CBrhId.String() == b.QID {
								dN := depNode{ID: d.QID, Name: d.CDepName, Type: "DEP"}
								bN.Children = append(bN.Children, dN)
							}
						}
						rN.Children = append(rN.Children, bN)
					}
				}
				cN.Children = append(cN.Children, rN)
			}
		}
		tree = append(tree, cN)
	}

	return tree, nil
}

// --- CRUD Operations ---

// CpyUpsert Thêm mới hoặc cập nhật công ty
func (s *S_Api_Org) CpyUpsert(cpy *org.M_Tb_Org_Cpy, via string, by uuid.UUID) (string, error) {
	var id string
	err := s.db.Raw("SELECT org.qsp_cpy_upsert($1, $2, $3, $4, $5, $6)",
		utils.NullUUID(cpy.QID), cpy.CCpyName, cpy.CTaxCode, utils.NullUUIDPtr(cpy.CParentId), via, utils.NullUUID(by)).Scan(&id).Error
	return id, err
}

// RegUpsert Thêm mới hoặc cập nhật khu vực
func (s *S_Api_Org) RegUpsert(reg *org.M_Tb_Org_Reg, via string, by uuid.UUID) (string, error) {
	var id string
	err := s.db.Raw("SELECT org.qsp_reg_upsert($1, $2, $3, $4, $5)",
		utils.NullUUID(reg.QID), reg.CCpyId, reg.CRegName, via, utils.NullUUID(by)).Scan(&id).Error
	return id, err
}

// BrhUpsert Thêm mới hoặc cập nhật chi nhánh
func (s *S_Api_Org) BrhUpsert(brh *org.M_Tb_Org_Brh, via string, by uuid.UUID) (string, error) {
	var id string
	err := s.db.Raw("SELECT org.qsp_brh_upsert($1, $2, $3, $4, $5, $6, $7)",
		utils.NullUUID(brh.QID), brh.CRegId, brh.CBrhName, brh.CAddress, brh.CPhone, via, utils.NullUUID(by)).Scan(&id).Error
	return id, err
}

// DepUpsert Thêm mới hoặc cập nhật phòng ban
func (s *S_Api_Org) DepUpsert(dep *org.M_Tb_Org_Dep, via string, by uuid.UUID) (string, error) {
	var id string
	err := s.db.Raw("SELECT org.qsp_dep_upsert($1, $2, $3, $4, $5)",
		utils.NullUUID(dep.QID), dep.CBrhId, dep.CDepName, via, utils.NullUUID(by)).Scan(&id).Error
	return id, err
}

// EntityDelete Xóa thực thể tổ chức (xóa mềm)
func (s *S_Api_Org) EntityDelete(table string, id uuid.UUID, via string, by uuid.UUID) (bool, error) {
	var result bool
	err := s.db.Raw("SELECT org.qsp_entity_delete($1, $2, $3, $4)", table, id, via, utils.NullUUID(by)).Scan(&result).Error
	return result, err
}

// GetCompanies Lấy danh sách công ty
func (s *S_Api_Org) GetCompanies() ([]org.M_Tb_Org_Cpy, error) {
	var list []org.M_Tb_Org_Cpy
	err := s.db.Where("q_is_deleted = ?", false).Order("c_cpy_name").Find(&list).Error
	return list, err
}

// GetRegions Lấy danh sách khu vực
func (s *S_Api_Org) GetRegions() ([]org.M_Tb_Org_Reg, error) {
	var list []org.M_Tb_Org_Reg
	err := s.db.Where("q_is_deleted = ?", false).Order("c_reg_name").Find(&list).Error
	return list, err
}

// GetBranches Lấy danh sách chi nhánh
func (s *S_Api_Org) GetBranches() ([]org.M_Tb_Org_Brh, error) {
	var list []org.M_Tb_Org_Brh
	err := s.db.Where("q_is_deleted = ?", false).Order("c_brh_name").Find(&list).Error
	return list, err
}

// GetDepartments Lấy danh sách phòng ban
func (s *S_Api_Org) GetDepartments() ([]org.M_Tb_Org_Dep, error) {
	var list []org.M_Tb_Org_Dep
	err := s.db.Where("q_is_deleted = ?", false).Order("c_dep_name").Find(&list).Error
	return list, err
}

// AssignUserToBranch Gán nhân viên vào chi nhánh
func (s *S_Api_Org) AssignUserToBranch(usrId, brhId uuid.UUID, isDefault bool, via string, by uuid.UUID) error {
	return s.db.Transaction(func(tx *gorm.DB) error {
		return tx.Exec("SELECT org.qsp_usr_brh_assign($1, $2, $3, $4, $5)",
			usrId, brhId, isDefault, via, utils.NullUUID(by)).Error
	})
}

// GetUserBranches Lấy danh sách chi nhánh của nhân viên (kèm tên chi nhánh)
func (s *S_Api_Org) GetUserBranches(usrId uuid.UUID) (interface{}, error) {
	var result []struct {
		CBrhId     string `json:"c_brh_id"`
		CBrhName   string `json:"c_brh_name"`
		CIsDefault bool   `json:"c_is_default"`
	}

	err := s.db.Table("org.qtb_usr_brh ub").
		Select("ub.c_brh_id, b.c_brh_name, ub.c_is_default").
		Joins("JOIN org.qtb_brh b ON ub.c_brh_id = b.q_id").
		Where("ub.c_usr_id = ? AND ub.q_is_deleted = FALSE AND b.q_is_deleted = FALSE", usrId).
		Scan(&result).Error

	return result, err
}

// GetDefaultBranch Lấy chi nhánh mặc định của nhân viên
func (s *S_Api_Org) GetDefaultBranch(usrId uuid.UUID) (*org.M_Tb_Org_Brh, error) {
	var brh org.M_Tb_Org_Brh
	err := s.db.Raw(`
		SELECT b.* 
		FROM org.qtb_brh b
		JOIN org.qtb_usr_brh ub ON b.q_id = ub.c_brh_id
		WHERE ub.c_usr_id = $1 AND ub.c_is_default = TRUE AND ub.q_is_deleted = FALSE AND b.q_is_deleted = FALSE
		LIMIT 1
	`, usrId).Scan(&brh).Error

	if err != nil {
		return nil, err
	}
	if brh.QID == "" {
		return nil, nil
	}
	return &brh, nil
}
