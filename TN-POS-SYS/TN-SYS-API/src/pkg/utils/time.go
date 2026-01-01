// 🇻🇳 Time utilities
// 🇺🇸 Time utilities
package utils

import "time"

// GetCurrentTimeMs Lấy thời gian hiện tại dạng Unix milliseconds
func GetCurrentTimeMs() int64 {
	return time.Now().UnixMilli()
}
