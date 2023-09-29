import 'package:flutter/material.dart';

enum UploadedItemStatus { uploading, uploaded, failed }

extension UploadedItemStatusExtension on UploadedItemStatus {
  String get name {
    switch (this) {
      case UploadedItemStatus.uploading:
        return 'Uploading';
      case UploadedItemStatus.uploaded:
        return 'Uploaded';
      case UploadedItemStatus.failed:
        return 'Failed';
      default:
        return 'Unknown';
    }
  }
}

extension UploadedItemStatusStringExtension on String {
  UploadedItemStatus get toUploadedItemStatus {
    switch (this) {
      case 'Uploading':
        return UploadedItemStatus.uploading;
      case 'Uploaded':
        return UploadedItemStatus.uploaded;
      case 'Failed':
        return UploadedItemStatus.failed;
      default:
        return UploadedItemStatus.uploading;
    }
  }
}

class UploadedItemModel {
  String id = UniqueKey().toString();
  String? cid;
  String fileName;
  String mimeType;
  UploadedItemStatus status = UploadedItemStatus.uploading;

  UploadedItemModel({
    this.id = '',
    this.cid,
    required this.fileName,
    required this.mimeType,
    this.status = UploadedItemStatus.uploading,
  });

  factory UploadedItemModel.fromJson(Map<String, dynamic> json) {
    return UploadedItemModel(
      id: json['id'] as String,
      cid: json['cid'] as String?,
      fileName: json['fileName'] as String,
      mimeType: json['mimeType'] as String,
      status: (json['status'] as String).toUploadedItemStatus,
    );
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['cid'] = cid;
    data['fileName'] = fileName;
    data['mimeType'] = mimeType;
    data['status'] = status.name;
    return data;
  }
}
