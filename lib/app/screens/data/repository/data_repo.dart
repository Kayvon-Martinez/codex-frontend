import 'package:flutter_dropzone/flutter_dropzone.dart';

abstract class DataRepository {
  Future<int> downloadFile(String cid, DropzoneViewController controller);
  Future<String> uploadFile(List<int> fileContents, String fileName);
}
