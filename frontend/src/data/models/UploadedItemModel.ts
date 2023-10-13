enum UploadedItemStatus {
  UPLOADING = "UPLOADING",
  UPLOADED = "UPLOADED",
  FAILED = "FAILED",
}

type UploadedItemModel = {
  cid: string;
  fileName: string;
  fileSize: number;
  lastModified: string;
  type: string;
  status: UploadedItemStatus;
};

export default UploadedItemModel;
export { UploadedItemStatus };
