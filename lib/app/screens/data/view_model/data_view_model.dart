import 'package:flutter/material.dart';
import 'package:flutter_dropzone/flutter_dropzone.dart';

import '../models/uploaded_item.dart';
import '../repository/data_repo.dart';

class DataViewModel extends ChangeNotifier {
  DataViewModel(this._dataRepository);

  final DataRepository _dataRepository;

  List<UploadedItemModel> uploadedItems = [];

  void addUploadedItem(UploadedItemModel uploadedItem) {
    uploadedItems.add(uploadedItem);
    notifyListeners();
  }

  void updateUploadedItem(UploadedItemModel uploadedItem) {
    uploadedItems[uploadedItems
        .indexWhere((element) => element.id == uploadedItem.id)] = uploadedItem;
    notifyListeners();
  }

  Future<String> uploadFile(List<int> fileContents, String fileName) async {
    return await _dataRepository.uploadFile(fileContents, fileName);
  }

  Future<int> downloadFile(
      String cid, DropzoneViewController controller) async {
    return await _dataRepository.downloadFile(cid, controller);
  }
}
