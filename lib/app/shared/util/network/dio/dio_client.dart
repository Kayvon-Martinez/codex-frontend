import 'package:dio/dio.dart';

// create a dio instance singleton
class DioClient {
  final client = Dio();

  static final DioClient _dioClient = DioClient._internal();

  factory DioClient() {
    return _dioClient;
  }

  DioClient._internal();
}
