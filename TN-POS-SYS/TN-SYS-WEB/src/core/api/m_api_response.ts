// 🇻🇳 Model phản hồi API chuẩn
// 🇺🇸 Standard API response model
export interface M_Api_Response<T> {
  // 🇻🇳 Mã phản hồi
  // 🇺🇸 Response code
  code: number;

  // 🇻🇳 Thông điệp
  // 🇺🇸 Message
  message: string;

  // 🇻🇳 Dữ liệu trả về
  // 🇺🇸 Response data
  data?: T;
}

