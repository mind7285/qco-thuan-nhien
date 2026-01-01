// 🇻🇳 Logger utilities
// 🇺🇸 Logger utilities
package utils

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var Logger *zap.Logger

// InitLogger Khởi tạo logger
func InitLogger() error {
	config := zap.NewProductionConfig()
	config.EncoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder
	config.Level = zap.NewAtomicLevelAt(zapcore.InfoLevel)

	var err error
	Logger, err = config.Build()
	if err != nil {
		return err
	}

	return nil
}

// GetLogger Lấy logger instance
func GetLogger() *zap.Logger {
	if Logger == nil {
		_ = InitLogger()
	}
	return Logger
}
