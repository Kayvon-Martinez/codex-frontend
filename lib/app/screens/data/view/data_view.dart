import 'dart:html' as html;
import 'dart:io';

import 'package:dexy/app/screens/data/view_model/data_view_model.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dropzone/flutter_dropzone.dart';
import 'package:provider/provider.dart';

import '../../../shared/util/constants.dart';
import '../models/uploaded_item.dart';

class DataScreen extends StatefulWidget {
  const DataScreen({super.key});

  @override
  State<DataScreen> createState() => _DataScreenState();
}

class _DataScreenState extends State<DataScreen> {
  late DataViewModel _dataViewModel;
  late DropzoneViewController controller;

  TextEditingController fileNameController = TextEditingController();
  TextEditingController cidController = TextEditingController();

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _dataViewModel = Provider.of<DataViewModel>(context, listen: false);
  }

  @override
  Widget build(BuildContext context) {
    return kIsWeb
        ? DefaultTabController(
            length: 2,
            child: Scaffold(
                appBar: const TabBar(
                  tabs: [
                    Tab(icon: Icon(Icons.upload_file)),
                    Tab(icon: Icon(Icons.download)),
                  ],
                ),
                body: TabBarView(
                  children: [
                    Stack(
                      children: [
                        DropzoneView(
                            operation: DragOperation.copy,
                            cursor: CursorType.grab,
                            onCreated: (DropzoneViewController ctrl) =>
                                controller = ctrl,
                            onDrop: (dynamic files) async {
                              final event = files as html.File;
                              // debugPrint('Received ${event.}');
                              final fileName =
                                  await controller.getFilename(event);
                              final mimeType =
                                  await controller.getFileMIME(event);
                              List<int> bytes =
                                  await controller.getFileData(event);
                              debugPrint(
                                  'Received $fileName of type $mimeType with ${bytes.length} bytes');
                              _dataViewModel.addUploadedItem(
                                UploadedItemModel(
                                  id: DateTime.now().toString(),
                                  cid: null,
                                  fileName: fileName,
                                  mimeType: mimeType,
                                  status: UploadedItemStatus.uploading,
                                ),
                              );
                              String itemId =
                                  _dataViewModel.uploadedItems.last.id;
                              try {
                                final cid = await _dataViewModel.uploadFile(
                                    bytes, fileName);
                                if (mounted) {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                      duration: const Duration(seconds: 15),
                                      content:
                                          Text("Uploaded file with CID: $cid"),
                                    ),
                                  );
                                }
                                _dataViewModel.updateUploadedItem(
                                  UploadedItemModel(
                                    id: itemId,
                                    cid: cid,
                                    fileName: fileName,
                                    mimeType: mimeType,
                                    status: UploadedItemStatus.uploaded,
                                  ),
                                );
                              } catch (e) {
                                debugPrint(e.toString());
                                _dataViewModel.updateUploadedItem(
                                  UploadedItemModel(
                                    id: itemId,
                                    cid: null,
                                    fileName: fileName,
                                    mimeType: mimeType,
                                    status: UploadedItemStatus.failed,
                                  ),
                                );
                              }
                            }),
                        Center(
                          child: SizedBox(
                            width: MediaQuery.of(context).size.width > 600
                                ? MediaQuery.of(context).size.width / 2
                                : MediaQuery.of(context).size.width * 0.8,
                            child: ListView(
                              shrinkWrap: true,
                              children: [
                                const Padding(
                                  padding: EdgeInsets.symmetric(vertical: 20),
                                  child: Center(
                                      child: Text('Drop files here to upload')),
                                ),
                                Consumer<DataViewModel>(
                                  builder: (context, dataViewModel, child) {
                                    return Center(
                                      child: ListView.builder(
                                        shrinkWrap: true,
                                        itemCount:
                                            dataViewModel.uploadedItems.length,
                                        itemBuilder: (context, index) {
                                          debugPrint(dataViewModel
                                              .uploadedItems.length
                                              .toString());
                                          return ListTile(
                                            title: SelectableText(dataViewModel
                                                .uploadedItems[index].fileName),
                                            subtitle: SelectableText(
                                                dataViewModel
                                                        .uploadedItems[index]
                                                        .cid ??
                                                    ""),
                                            trailing: dataViewModel
                                                        .uploadedItems[index]
                                                        .status
                                                        .name ==
                                                    "Uploading"
                                                ? const CircularProgressIndicator()
                                                : dataViewModel
                                                            .uploadedItems[
                                                                index]
                                                            .status
                                                            .name ==
                                                        "Uploaded"
                                                    ? const Icon(Icons.check)
                                                    : const Icon(Icons.error),
                                          );
                                        },
                                      ),
                                    );
                                  },
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                    SizedBox(
                      width: MediaQuery.of(context).size.width > 600
                          ? MediaQuery.of(context).size.width / 2
                          : MediaQuery.of(context).size.width * 0.8,
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        mainAxisAlignment: MainAxisAlignment.center,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Row(
                            children: [
                              // SizedBox(
                              //   width: MediaQuery.of(context).size.width > 600
                              //       ? MediaQuery.of(context).size.width / 8
                              //       : MediaQuery.of(context).size.width * 0.3,
                              //   child: TextField(
                              //     controller: fileNameController,
                              //     maxLines: 1,
                              //     onChanged: (value) {},
                              //     decoration: const InputDecoration(
                              //       border: OutlineInputBorder(
                              //         borderSide: BorderSide.none,
                              //         borderRadius: BorderRadius.only(
                              //           topLeft: Radius.circular(10),
                              //           bottomLeft: Radius.circular(10),
                              //         ),
                              //       ),
                              //       hintText: "Enter File Name",
                              //       filled: true,
                              //       fillColor: Color(0xff363636),
                              //       contentPadding: EdgeInsets.symmetric(
                              //           vertical: 17.25, horizontal: 10),
                              //     ),
                              //   ),
                              // ),
                              // Container(
                              //   width: 1,
                              //   height: 50,
                              //   color: Colors.white,
                              // ),
                              SizedBox(
                                width: MediaQuery.of(context).size.width > 600
                                    ? MediaQuery.of(context).size.width / 3
                                    : MediaQuery.of(context).size.width * 0.5,
                                child: TextField(
                                  controller: cidController,
                                  maxLines: 1,
                                  onChanged: (value) {},
                                  decoration: const InputDecoration(
                                    border: OutlineInputBorder(
                                      borderSide: BorderSide.none,
                                    ),
                                    hintText: "Enter CID",
                                    filled: true,
                                    fillColor: Color(0xff363636),
                                    contentPadding: EdgeInsets.symmetric(
                                        vertical: 17.25, horizontal: 10),
                                  ),
                                ),
                              ),
                            ],
                          ),
                          SizedBox(
                            width: MediaQuery.of(context).size.width > 600
                                ? MediaQuery.of(context).size.width / 5
                                : MediaQuery.of(context).size.width * 0.3,
                            height: 50,
                            child: ElevatedButton(
                              onPressed: () {
                                html.AnchorElement anchorElement =
                                    html.AnchorElement(
                                  href:
                                      "$baseUrl/api/codex/v1/download/${cidController.text}",
                                )
                                      ..setAttribute("download",
                                          "") //, fileNameController.text)
                                      ..click();
                                // anchorElement.download =
                                //     fileNameController.text;
                                // anchorElement.click();
                              },
                              style: ElevatedButton.styleFrom(
                                foregroundColor: Colors.white,
                                backgroundColor:
                                    Theme.of(context).colorScheme.primary,
                                shape: const RoundedRectangleBorder(
                                  borderRadius: BorderRadius.only(
                                    topRight: Radius.circular(10),
                                    bottomRight: Radius.circular(10),
                                  ),
                                ),
                              ),
                              child: const Text("Download"),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                )),
          )
        : Center(
            child: Text("Not yet supported on ${Platform.operatingSystem}"));
  }
}
