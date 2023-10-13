import { useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import UploadedItemModel, {
  UploadedItemStatus,
} from "../../../../data/models/UploadedItemModel";
import UploadedItemComponent from "../../../../components/uploadedItem/UploadedItemComponent";
import axios from "axios";
import constants from "../../../../util/Constants";

import { useDexyStore } from "../../../../store";

function UploadTab() {
  const { uploads, setUploads } = useDexyStore();
  var filesCopy = useRef<UploadedItemModel[]>(uploads);

  useEffect(() => {
    console.log(uploads);
    // setUploads([]);
  }, [uploads]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      console.log(acceptedFiles);
      for (let i = 0; i < acceptedFiles.length; i++) {
        new Promise(async (resolve, reject) => {
          let cid: string = (Math.random() * 1000000).toString();
          console.log(cid + acceptedFiles[i].name);
          filesCopy.current.push({
            cid: cid,
            fileName: acceptedFiles[i].name,
            fileSize: acceptedFiles[i].size,
            lastModified: new Date(
              acceptedFiles[i].lastModified
            ).toLocaleString(),
            type: acceptedFiles[i].type,
            status: UploadedItemStatus.UPLOADING,
          });
          setUploads(filesCopy.current);

          var bytes = await acceptedFiles[i].arrayBuffer();
          bytes = new Uint8Array(bytes);

          var newCid = "";
          try {
            await axios
              .post(`${constants.testApiBaseUrl}/upload`, bytes, {
                headers: {
                  "Content-Type": "application/octet-stream",
                },
              })
              .then((response) => {
                console.log(response.data);
                newCid = response.data.cid;
              });
            console.log(newCid);

            filesCopy.current = filesCopy.current.filter(
              (file) => file.cid !== cid
            );
            filesCopy.current.push({
              cid: newCid,
              fileName: acceptedFiles[i].name,
              fileSize: acceptedFiles[i].size,
              lastModified: new Date(
                acceptedFiles[i].lastModified
              ).toLocaleString(),
              type: acceptedFiles[i].type,
              status: UploadedItemStatus.UPLOADED,
            });
            setUploads(filesCopy.current);
            console.log("filesCopy");
            console.log(filesCopy.current);
          } catch (error) {
            console.log(error);
            filesCopy.current = filesCopy.current.filter(
              (file) => file.cid !== cid
            );
            filesCopy.current.push({
              cid: "Failed",
              fileName: acceptedFiles[i].name,
              fileSize: acceptedFiles[i].size,
              lastModified: new Date(
                acceptedFiles[i].lastModified
              ).toLocaleString(),
              type: acceptedFiles[i].type,
              status: UploadedItemStatus.FAILED,
            });
            console.log("filesCopy failed");
            console.log(filesCopy.current);
            setUploads(filesCopy.current);
          }
          console.log(cid + acceptedFiles[i].name);
          resolve("done");
        });
      }
    },
    [setUploads, filesCopy]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <UploadTabWrapper>
      <div
        id="dropzone"
        {...getRootProps()}
        style={{
          minHeight: uploads.length > 0 ? "33%" : "100%",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <div
        id="uploaded-items-wrap"
        style={{
          maxHeight: uploads.length > 0 ? "60vh" : "0%",
        }}
      >
        {uploads.map((file) => (
          <UploadedItemComponent item={file} key={file.cid} />
        ))}
      </div>
    </UploadTabWrapper>
  );
}

export default UploadTab;

const UploadTabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 16px;

  #dropzone {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 2px dashed #9e9e9e;
    border-radius: 8px;
  }

  p {
    font-size: 1rem;
    text-align: center;
  }

  #uploaded-items-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 100%;
    overflow-y: scroll;
    margin-top: 16px;
  }
`;
