import 'package:dio/dio.dart';
import 'package:flutter_dropzone/flutter_dropzone.dart';

// import 'package:http/http.dart' as http;
// import 'package:http_parser/http_parser.dart';

import '../../../shared/util/constants.dart';
import '../../../shared/util/network/dio/dio_client.dart';
import 'data_repo.dart';

class DataRepositoryImpl extends DataRepository {
  @override
  Future<int> downloadFile(
      String cid, DropzoneViewController controller) async {
    return 200;
  }

  @override
  Future<String> uploadFile(List<int> fileContents, String fileName) async {
    var response = await DioClient().client.post(
          "$baseUrl/api/codex/v1/upload",
          data: String.fromCharCodes(fileContents),
          options: Options(contentType: "application/octet-stream"),
        );
    return response.data.toString().trim();
  }
}
