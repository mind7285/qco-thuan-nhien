// 🇻🇳 Client API cơ sở
// 🇺🇸 Base API client
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'm_api_response.dart';

class Api_Client {
  final String baseUrl;

  Api_Client({String? baseUrl})
      : baseUrl = baseUrl ?? 'http://localhost:3000';

  // 🇻🇳 Lấy token từ storage
  // 🇺🇸 Get token from storage
  String? _getToken() {
    // TODO: Implement token retrieval from secure storage
    return null;
  }

  // 🇻🇳 Lấy headers xác thực
  // 🇺🇸 Get authentication headers
  Map<String, String> _getAuthHeaders() {
    final token = _getToken();
    return token != null ? {'Authorization': 'Bearer $token'} : {};
  }

  // 🇻🇳 Gửi request GET
  // 🇺🇸 Send GET request
  Future<M_Api_Response<T>> get<T>(
    String path, {
    T Function(Map<String, dynamic>)? fromJson,
  }) async {
    final response = await http.get(
      Uri.parse('$baseUrl$path'),
      headers: {
        'Content-Type': 'application/json',
        ..._getAuthHeaders(),
      },
    );

    return _handleResponse<T>(response, fromJson);
  }

  // 🇻🇳 Gửi request POST
  // 🇺🇸 Send POST request
  Future<M_Api_Response<T>> post<T>(
    String path, {
    Object? body,
    T Function(Map<String, dynamic>)? fromJson,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl$path'),
      headers: {
        'Content-Type': 'application/json',
        ..._getAuthHeaders(),
      },
      body: body != null ? jsonEncode(body) : null,
    );

    return _handleResponse<T>(response, fromJson);
  }

  // 🇻🇳 Gửi request DELETE
  // 🇺🇸 Send DELETE request
  Future<M_Api_Response<T>> delete<T>(
    String path, {
    T Function(Map<String, dynamic>)? fromJson,
  }) async {
    final response = await http.delete(
      Uri.parse('$baseUrl$path'),
      headers: {
        'Content-Type': 'application/json',
        ..._getAuthHeaders(),
      },
    );

    return _handleResponse<T>(response, fromJson);
  }

  // 🇻🇳 Xử lý phản hồi
  // 🇺🇸 Handle response
  Future<M_Api_Response<T>> _handleResponse<T>(
    http.Response response,
    T Function(Map<String, dynamic>)? fromJson,
  ) async {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      final json = jsonDecode(response.body) as Map<String, dynamic>;
      final apiResponse = M_Api_Response.fromJson(
        json,
        fromJson != null ? (obj) => fromJson(obj as Map<String, dynamic>) : null,
      );
      return apiResponse;
    } else {
      throw Exception('HTTP ${response.statusCode}: ${response.body}');
    }
  }
}

