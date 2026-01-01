// 🇻🇳 Auth Service
// 🇺🇸 Auth Service
package service

import (
	"errors"
	"tn-pos-sys-api/internal/model/auth"
	"tn-pos-sys-api/pkg/utils"

	"go.uber.org/zap"
	"gorm.io/gorm"
)

// S_Api_Auth Auth service
type S_Api_Auth struct {
	db     *gorm.DB
	logger *zap.Logger
}

// NewAuthService Tạo service mới
func NewAuthService(db *gorm.DB) *S_Api_Auth {
	return &S_Api_Auth{
		db:     db,
		logger: utils.GetLogger(),
	}
}

// Login Đăng nhập - Trả về cả session và user info
// usrName: tên đăng nhập
// pwd: mật khẩu plain text
// loginIP: IP đăng nhập
func (s *S_Api_Auth) Login(usrName, pwd, loginIP string) (*auth.M_Tb_Auth_Usr_Ses, *auth.M_Tb_Auth_Usr, error) {
	// 1. Lấy user từ database bằng function
	var usr auth.M_Tb_Auth_Usr
	err := s.db.Raw(
		"SELECT * FROM auth.qfn_usr_get_by_name($1)",
		usrName,
	).First(&usr).Error
	if err != nil {
		s.logger.Error("User not found",
			zap.String("usrName", usrName),
			zap.Error(err),
		)
		// Không trả về lỗi chi tiết để bảo mật
		return nil, nil, errors.New("Mật khẩu không chính xác")
	}

	// Kiểm tra xem có lấy được user không
	if usr.QID == "" {
		s.logger.Error("User QID is empty",
			zap.String("usrName", usrName),
		)
		return nil, nil, errors.New("Mật khẩu không chính xác")
	}

	s.logger.Info("User found",
		zap.String("usrID", usr.QID),
		zap.String("usrName", usr.CUsrName),
		zap.Bool("hasPwdHash", usr.CPwdHash != ""),
		zap.Int("pwdHashLength", len(usr.CPwdHash)),
		zap.String("pwdHashPrefix", func() string {
			if len(usr.CPwdHash) >= 4 {
				return usr.CPwdHash[:4]
			}
			return ""
		}()),
	)

	// 2. Verify password bằng bcrypt
	passwordMatch := utils.CheckPassword(pwd, usr.CPwdHash)
	if !passwordMatch {
		// Log chi tiết để debug
		s.logger.Warn("Password mismatch",
			zap.String("usrName", usrName),
			zap.String("usrID", usr.QID),
			zap.Int("pwdLength", len(pwd)),
			zap.Int("hashLength", len(usr.CPwdHash)),
			zap.String("hashPrefix", func() string {
				if len(usr.CPwdHash) >= 7 {
					return usr.CPwdHash[:7]
				}
				return usr.CPwdHash
			}()),
		)
		return nil, nil, errors.New("Mật khẩu không chính xác")
	}

	s.logger.Info("Password verified successfully", zap.String("usrID", usr.QID))

	// 3. Tạo session bằng stored procedure
	s.logger.Info("Creating session via SP",
		zap.String("usrID", usr.QID),
		zap.String("loginIP", loginIP),
	)

	// SP trả về SETOF (table), dùng Scan() để lấy kết quả
	// Lưu ý: GORM với SETOF function cần dùng Scan() thay vì First()
	var ses auth.M_Tb_Auth_Usr_Ses
	rows, err := s.db.Raw(
		"SELECT * FROM auth.qsp_usr_ses_create($1, $2)",
		usr.QID, loginIP,
	).Rows()

	if err != nil {
		s.logger.Error("Failed to execute session SP",
			zap.String("usrID", usr.QID),
			zap.String("loginIP", loginIP),
			zap.Error(err),
		)
		return nil, nil, errors.New("Failed to create session")
	}
	defer rows.Close()

	// Scan kết quả từ SETOF
	if !rows.Next() {
		s.logger.Error("No session returned from SP",
			zap.String("usrID", usr.QID),
		)
		return nil, nil, errors.New("Failed to create session")
	}

	if err := s.db.ScanRows(rows, &ses); err != nil {
		s.logger.Error("Failed to scan session result",
			zap.String("usrID", usr.QID),
			zap.Error(err),
		)
		return nil, nil, errors.New("Failed to create session")
	}

	s.logger.Info("Session created successfully",
		zap.String("usrID", usr.QID),
		zap.String("sesID", ses.QID),
		zap.String("sesToken", ses.CSesToken[:16]+"..."),
	)

	return &ses, &usr, nil
}

// Logout Đăng xuất
func (s *S_Api_Auth) Logout(sesToken string) (bool, error) {
	var result bool

	err := s.db.Raw(
		"SELECT auth.qsp_usr_logout($1)",
		sesToken,
	).Scan(&result).Error

	if err != nil {
		s.logger.Error("Logout failed", zap.Error(err))
		return false, err
	}

	return result, nil
}

// Register Đăng ký
func (s *S_Api_Auth) Register(usr *auth.M_Tb_Auth_Usr) (string, error) {
	var usrID string

	// Gọi stored procedure với NULL cho UUID
	err := s.db.Raw(
		"SELECT auth.qsp_usr_upsert($1, $2, $3, $4, $5, $6, $7, $8)",
		nil, // p_usr_id (NULL for insert)
		usr.CUsrName,
		usr.CPwdHash,
		usr.CFullName,
		usr.CEmail,
		usr.CPhone,
		"API",
		nil, // p_by
	).Scan(&usrID).Error

	if err != nil {
		s.logger.Error("Register failed", zap.Error(err))
		return "", err
	}

	return usrID, nil
}

// ForgotPwd Quên mật khẩu
func (s *S_Api_Auth) ForgotPwd(email string) (bool, error) {
	// Tìm user theo email bằng function
	var usr auth.M_Tb_Auth_Usr
	err := s.db.Raw(
		"SELECT * FROM auth.qfn_usr_get_by_email($1)",
		email,
	).First(&usr).Error

	if err != nil {
		// Luôn trả về true để bảo mật
		return true, nil
	}

	// Tạo OTP (giả sử đã có OTP code)
	otpCode := "123456" // TODO: Generate OTP
	var result bool
	err = s.db.Raw(
		"SELECT auth.qsp_usr_otp_create($1, $2)",
		usr.QID, otpCode,
	).Scan(&result).Error

	if err != nil {
		s.logger.Error("Failed to create OTP", zap.Error(err))
	}

	// TODO: Gửi email với OTP

	return true, nil
}

// ChangePwd Đổi mật khẩu
// oldPwd: mật khẩu cũ (plain text)
// newPwd: mật khẩu mới (plain text)
func (s *S_Api_Auth) ChangePwd(usrID, oldPwd, newPwd string) (bool, error) {
	// Lấy user để lấy hash mật khẩu hiện tại bằng function
	var usr auth.M_Tb_Auth_Usr
	err := s.db.Raw(
		"SELECT * FROM auth.qfn_usr_get_by_id($1)",
		usrID,
	).First(&usr).Error
	if err != nil {
		s.logger.Error("User not found", zap.Error(err))
		return false, errors.New("User not found")
	}

	// Kiểm tra mật khẩu cũ
	if !utils.CheckPassword(oldPwd, usr.CPwdHash) {
		return false, errors.New("Mật khẩu cũ không chính xác")
	}

	// Hash mật khẩu mới
	newPwdHash, err := utils.HashPassword(newPwd)
	if err != nil {
		s.logger.Error("Failed to hash new password", zap.Error(err))
		return false, err
	}

	// Gọi stored procedure với hash
	var result bool
	err = s.db.Raw(
		"SELECT auth.qsp_usr_change_pwd($1, $2, $3)",
		usrID, usr.CPwdHash, newPwdHash,
	).Scan(&result).Error

	if err != nil {
		s.logger.Error("Change password failed", zap.Error(err))
		return false, err
	}

	return result, nil
}

// HasPerm Kiểm tra quyền
func (s *S_Api_Auth) HasPerm(usrID, permCode string) (bool, error) {
	var result bool

	err := s.db.Raw(
		"SELECT auth.qfn_usr_has_perm($1, $2)",
		usrID, permCode,
	).Scan(&result).Error

	if err != nil {
		s.logger.Error("Check permission failed", zap.Error(err))
		return false, err
	}

	return result, nil
}
