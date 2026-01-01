// 🇻🇳 API Response Model
// 🇺🇸 API Response Model
package model

// M_Api_Response Standard API response
type M_Api_Response[T any] struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Data    *T     `json:"data,omitempty"`
}

// NewSuccessResponse Tạo response thành công
func NewSuccessResponse[T any](data T) M_Api_Response[T] {
	return M_Api_Response[T]{
		Code:    200,
		Message: "Success",
		Data:    &data,
	}
}

// NewErrorResponse Tạo response lỗi
func NewErrorResponse(code int, message string) M_Api_Response[any] {
	return M_Api_Response[any]{
		Code:    code,
		Message: message,
		Data:    nil,
	}
}
