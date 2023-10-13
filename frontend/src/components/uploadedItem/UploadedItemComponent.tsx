import React from "react";
import styled from "styled-components";

import { CircularProgress } from "@mui/material";
import { MdCheck, MdError } from "react-icons/md";
import UploadedItemModel, {
  UploadedItemStatus,
} from "../../data/models/UploadedItemModel";
import constants from "../../util/Constants";

function UploadedItemComponent(props: { item: UploadedItemModel }) {
  return (
    <UploadedItemComponentWrapper>
      <div>
        <p>
          <span>Name: </span>
          {props.item.fileName}
        </p>
        <p>
          <span>File size (bytes): </span>
          {props.item.fileSize}
        </p>
      </div>
      <div>
        <p>
          <span>Last Modified: </span>
          {props.item.lastModified}
        </p>
        <p>
          <span>Type: </span>
          {props.item.type}
        </p>
      </div>
      <div>
        <p id="cid">
          <span>CID: </span>
          {(props.item.status === UploadedItemStatus.UPLOADING &&
            "Uploading...") ||
            (props.item.status === UploadedItemStatus.FAILED && (
              <span style={{ color: constants.errorColor }}>Upload failed</span>
            )) || (
              <span
                style={{
                  color: constants.successColor,
                  wordBreak: "break-all",
                }}
              >
                {props.item.cid}
              </span>
            )}
        </p>
        <p>{props.item.status}</p>
        {(props.item.status === UploadedItemStatus.UPLOADING && (
          <CircularProgress size={24} />
        )) ||
          (props.item.status === UploadedItemStatus.UPLOADED && <MdCheck />) ||
          (props.item.status === UploadedItemStatus.FAILED && <MdError />)}
      </div>
    </UploadedItemComponentWrapper>
  );
}

export default UploadedItemComponent;

const UploadedItemComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${constants.surfaceColor};
  border-radius: 8px;
  padding: 10px;
  width: 80%;
  margin-top: 20px;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 5px;
  }

  div p:nth-child(1) {
    text-align: start;
  }

  div p:nth-child(2) {
    text-align: end;
  }

  p {
    flex: 1;
    font-size: 1rem;
    text-align: start;
    margin: 5px;
  }

  p span {
    font-weight: bold;
  }

  #cid {
    flex: 2;
  }

  @media (max-width: 1180px) {
    width: 85%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 450px) {
    width: 95%;
  }
`;
