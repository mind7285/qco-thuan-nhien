// 🇻🇳 Client API cơ sở
// 🇺🇸 Base API client
import 'dart:convert';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'm_api_response.dart';

// Import dart:io cho non-web platforms (macOS, Linux, Windows, iOS, Android)
// Import dart:io for non-web platforms (macOS, Linux, Windows, iOS, Android)
// Note: This will cause a warning on web but won't be used there due to kIsWeb check
import 'dart:io' show Platform, SocketException;

class Api_Client {
  final String baseUrl;
  final _storage = const FlutterSecureStorage();

  Api_Client({String? baseUrl})
      : baseUrl = _calculateBaseUrl(baseUrl) {
    // Debug: In ra URL đang sử dụng
    // Debug: Print the URL being used
    print('🔗 API Client initialized');
    print('   - Provided baseUrl (param): $baseUrl');
    print('   - Final baseUrl (field): ${this.baseUrl}');
    print('   - Platform: ${_getPlatformInfo()}');
    
    // Đảm bảo baseUrl không null
    // Ensure baseUrl is not null
    if (this.baseUrl.isEmpty) {
      print('❌ ERROR: baseUrl is empty!');
    }
  }

  // 🇻🇳 Tính toán baseUrl cuối cùng
  // 🇺🇸 Calculate final baseUrl
  static String _calculateBaseUrl(String? providedUrl) {
    print('🔍 _calculateBaseUrl called with: $providedUrl');
    
    try {
      final defaultUrl = _getDefaultBaseUrl();
      print('🔍 Got defaultUrl: $defaultUrl');
      
      final finalUrl = providedUrl ?? defaultUrl;
      print('🔍 finalUrl (after ??): $finalUrl');
      
      final ensuredUrl = _ensureBaseUrl(finalUrl);
      print('🔍 ensuredUrl: $ensuredUrl');
      
      return ensuredUrl;
    } catch (e, stackTrace) {
      print('❌ Error calculating baseUrl: $e');
      print('❌ Stack trace: $stackTrace');
      // Fallback an toàn tuyệt đối
      // Absolute safe fallback
      const fallback = 'http://127.0.0.1:3000/api/v1';
      print('✅ Using fallback: $fallback');
      return fallback;
    }
  }

  // 🇻🇳 Đảm bảo baseUrl không bao giờ null
  // 🇺🇸 Ensure baseUrl is never null
  static String _ensureBaseUrl(String? url) {
    if (url != null && url.isNotEmpty) {
      return url;
    }
    // Fallback an toàn - mặc định cho macOS/Linux/Windows
    // Safe fallback - default for macOS/Linux/Windows
    return 'http://127.0.0.1:3000/api/v1';
  }

  // 🇻🇳 Lấy thông tin platform để debug
  // 🇺🇸 Get platform info for debugging
  static String _getPlatformInfo() {
    if (kIsWeb) return 'Web';
    try {
      if (Platform.isAndroid) return 'Android';
      if (Platform.isIOS) return 'iOS';
      if (Platform.isMacOS) return 'macOS';
      if (Platform.isLinux) return 'Linux';
      if (Platform.isWindows) return 'Windows';
      return 'Unknown';
    } catch (e) {
      return 'Error: $e';
    }
  }

  // 🇻🇳 Lấy URL mặc định dựa trên platform
  // 🇺🇸 Get default URL based on platform
  static String _getDefaultBaseUrl() {
    print('🔍 _getDefaultBaseUrl() called');
    
    // Fallback mặc định - luôn có giá trị hợp lệ
    // Default fallback - always has a valid value
    const defaultFallback = 'http://127.0.0.1:3000/api/v1';
    
    try {
      // Nếu có biến môi trường, ưu tiên sử dụng
      // If environment variable exists, use it first
      const envBaseUrl = String.fromEnvironment('API_BASE_URL');
      print('🔍 envBaseUrl: "$envBaseUrl"');
      if (envBaseUrl.isNotEmpty) {
        print('✅ Using environment variable: $envBaseUrl');
        return envBaseUrl;
      }

      // Phát hiện platform và trả về URL phù hợp
      // Detect platform and return appropriate URL
      print('🔍 kIsWeb: $kIsWeb');
      if (kIsWeb) {
        // Web platform - sử dụng localhost hoặc có thể cần cấu hình khác
        // Web platform - use localhost or may need different config
        const webUrl = 'http://localhost:3000/api/v1';
        print('✅ Web platform detected, using: $webUrl');
        return webUrl;
      }

      // Sử dụng dart:io Platform (chỉ có khi không phải web)
      // Use dart:io Platform (only available when not web)
      String? detectedUrl;
      try {
        print('🔍 Checking Platform...');
        if (Platform.isAndroid) {
          detectedUrl = 'http://10.0.2.2:3000/api/v1';
          print('✅ Android detected, using: $detectedUrl');
        } else if (Platform.isIOS) {
          detectedUrl = 'http://localhost:3000/api/v1';
          print('✅ iOS detected, using: $detectedUrl');
        } else if (Platform.isMacOS) {
          detectedUrl = 'http://127.0.0.1:3000/api/v1';
          print('✅ macOS detected, using: $detectedUrl');
        } else if (Platform.isLinux) {
          detectedUrl = 'http://127.0.0.1:3000/api/v1';
          print('✅ Linux detected, using: $detectedUrl');
        } else if (Platform.isWindows) {
          detectedUrl = 'http://127.0.0.1:3000/api/v1';
          print('✅ Windows detected, using: $detectedUrl');
        } else {
          print('⚠️ Unknown platform, will use fallback');
        }
      } catch (e, stackTrace) {
        // Nếu không thể detect platform, fallback về 127.0.0.1
        // If cannot detect platform, fallback to 127.0.0.1
        print('⚠️ Warning: Could not detect platform: $e');
        print('⚠️ Stack trace: $stackTrace');
      }

      // Fallback cho platform khác hoặc nếu không detect được
      // Fallback for other platforms or if detection failed
      final finalUrl = detectedUrl ?? defaultFallback;
      print('✅ Final URL from _getDefaultBaseUrl: $finalUrl');
      return finalUrl;
    } catch (e, stackTrace) {
      // Nếu có bất kỳ lỗi nào, luôn trả về fallback mặc định
      // If any error occurs, always return default fallback
      print('❌ CRITICAL ERROR in _getDefaultBaseUrl: $e');
      print('❌ Stack trace: $stackTrace');
      print('✅ Using safe fallback: $defaultFallback');
      return defaultFallback;
    }
  }

  // 🇻🇳 Lưu token
  // 🇺🇸 Save token
  Future<void> saveToken(String token) async {
    await _storage.write(key: 'auth_token', value: token);
  }

  // 🇻🇳 Xóa token
  // 🇺🇸 Clear token
  Future<void> clearToken() async {
    await _storage.delete(key: 'auth_token');
  }

  // 🇻🇳 Lấy headers xác thực
  // 🇺🇸 Get authentication headers
  Future<Map<String, String>> _getAuthHeaders() async {
    final token = await _storage.read(key: 'auth_token');
    return token != null ? {'Authorization': 'Bearer $token'} : {};
  }

  // 🇻🇳 Gửi request GET
  // 🇺🇸 Send GET request
  Future<M_Api_Response<T>> get<T>(
    String path, {
    T Function(Map<String, dynamic>)? fromJson,
  }) async {
    try {
      final headers = await _getAuthHeaders();
      final response = await http.get(
        Uri.parse('$baseUrl$path'),
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      ).timeout(
        const Duration(seconds: 30),
        onTimeout: () {
          throw Exception('Connection timeout. Vui lòng kiểm tra kết nối mạng');
        },
      );

      return _handleResponse<T>(response, fromJson);
    } on SocketException catch (e) {
      throw Exception('Connection failed: ${e.message}');
    } catch (e) {
      rethrow;
    }
  }

  // 🇻🇳 Gửi request POST
  // 🇺🇸 Send POST request
  Future<M_Api_Response<T>> post<T>(
    String path, {
    Object? body,
    T Function(Map<String, dynamic>)? fromJson,
  }) async {
    try {
      final headers = await _getAuthHeaders();
      final response = await http.post(
        Uri.parse('$baseUrl$path'),
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body != null ? jsonEncode(body) : null,
      ).timeout(
        const Duration(seconds: 30),
        onTimeout: () {
          throw Exception('Connection timeout. Vui lòng kiểm tra kết nối mạng');
        },
      );

      return _handleResponse<T>(response, fromJson);
    } on SocketException catch (e) {
      throw Exception('Connection failed: ${e.message}');
    } catch (e) {
      rethrow;
    }
  }

  // 🇻🇳 Gửi request DELETE
  // 🇺🇸 Send DELETE request
  Future<M_Api_Response<T>> delete<T>(
    String path, {
    T Function(Map<String, dynamic>)? fromJson,
  }) async {
    try {
      final headers = await _getAuthHeaders();
      final response = await http.delete(
        Uri.parse('$baseUrl$path'),
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      ).timeout(
        const Duration(seconds: 30),
        onTimeout: () {
          throw Exception('Connection timeout. Vui lòng kiểm tra kết nối mạng');
        },
      );

      return _handleResponse<T>(response, fromJson);
    } on SocketException catch (e) {
      throw Exception('Connection failed: ${e.message}');
    } catch (e) {
      rethrow;
    }
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
        fromJson != null
            ? (obj) => fromJson(obj as Map<String, dynamic>)
            : (obj) => obj as T,
      );
      return apiResponse;
    } else {
      throw Exception('HTTP ${response.statusCode}: ${response.body}');
    }
  }
}

