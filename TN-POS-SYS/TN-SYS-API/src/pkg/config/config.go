// 🇻🇳 Config management
// 🇺🇸 Config management
package config

import (
	"github.com/spf13/viper"
)

// Config Application config
type Config struct {
	Server   ServerConfig   `mapstructure:"server"`
	Database DatabaseConfig `mapstructure:"database"`
}

// ServerConfig Server configuration
type ServerConfig struct {
	Port string `mapstructure:"port"`
	Host string `mapstructure:"host"`
}

// DatabaseConfig Database configuration
type DatabaseConfig struct {
	Host     string `mapstructure:"host"`
	Port     string `mapstructure:"port"`
	User     string `mapstructure:"user"`
	Password string `mapstructure:"password"`
	DBName   string `mapstructure:"dbname"`
	SSLMode  string `mapstructure:"sslmode"`
	TimeZone string `mapstructure:"timezone"`
}

// LoadConfig Load configuration từ file
func LoadConfig(path string) (*Config, error) {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(path)
	viper.AddConfigPath(".")
	viper.AddConfigPath("./config")

	// Set defaults
	viper.SetDefault("server.port", "3000")
	viper.SetDefault("server.host", "0.0.0.0")
	viper.SetDefault("database.host", "localhost")
	viper.SetDefault("database.port", "5432")
	viper.SetDefault("database.user", "postgres")
	viper.SetDefault("database.password", "postgres")
	viper.SetDefault("database.dbname", "qc_thuan_nhien_db")
	viper.SetDefault("database.sslmode", "disable")
	viper.SetDefault("database.timezone", "Asia/Ho_Chi_Minh")

	// Read config file
	if err := viper.ReadInConfig(); err != nil {
		// Nếu không tìm thấy file, dùng defaults
		_ = viper.SafeWriteConfig()
	}

	var config Config
	if err := viper.Unmarshal(&config); err != nil {
		return nil, err
	}

	return &config, nil
}

// GetDSN Tạo DSN string từ config
func (c *DatabaseConfig) GetDSN() string {
	return "host=" + c.Host +
		" user=" + c.User +
		" password=" + c.Password +
		" dbname=" + c.DBName +
		" port=" + c.Port +
		" sslmode=" + c.SSLMode +
		" TimeZone=" + c.TimeZone
}
