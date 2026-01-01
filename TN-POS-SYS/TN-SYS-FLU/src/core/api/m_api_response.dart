// 🇻🇳 Model phản hồi API chuẩn
// 🇺🇸 Standard API response model
import 'package:freezed_annotation/freezed_annotation.dart';

part 'm_api_response.freezed.dart';
part 'm_api_response.g.dart';

@freezed
class M_Api_Response<T> with _$M_Api_Response<T> {
  const factory M_Api_Response({
    // 🇻🇳 Mã phản hồi
    // 🇺🇸 Response code
    required int code,

    // 🇻🇳 Thông điệp
    // 🇺🇸 Message
    required String message,

    // 🇻🇳 Dữ liệu trả về
    // 🇺🇸 Response data
    T? data,
  }) = _M_Api_Response<T>;

  factory M_Api_Response.fromJson(
    Map<String, dynamic> json,
    T Function(Object?) fromJsonT,
  ) =>
      _$M_Api_ResponseFromJson(json, fromJsonT);
}

