// 🇻🇳 Model phản hồi API chuẩn
// 🇺🇸 Standard API response model

class M_Api_Response<T> {
  // 🇻🇳 Mã phản hồi
  // 🇺🇸 Response code
  final int code;

  // 🇻🇳 Thông điệp
  // 🇺🇸 Message
  final String message;

  // 🇻🇳 Dữ liệu trả về
  // 🇺🇸 Response data
  final T? data;

  const M_Api_Response({
    required this.code,
    required this.message,
    this.data,
  });

  // 🇻🇳 Tạo từ JSON
  // 🇺🇸 Create from JSON
  factory M_Api_Response.fromJson(
    Map<String, dynamic> json,
    T Function(Object?)? fromJsonT,
  ) {
    return M_Api_Response<T>(
      code: json['code'] as int,
      message: json['message'] as String,
      data: json['data'] != null && fromJsonT != null
          ? fromJsonT(json['data'])
          : json['data'] as T?,
    );
  }

  // 🇻🇳 Chuyển sang JSON
  // 🇺🇸 Convert to JSON
  Map<String, dynamic> toJson([Object? Function(T)? toJsonT]) {
    return {
      'code': code,
      'message': message,
      'data': data != null && toJsonT != null
          ? toJsonT(data as T)
          : data,
    };
  }
}
