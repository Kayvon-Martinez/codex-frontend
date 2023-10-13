import React from "react";
import constants from "../../../../util/Constants";
import styled from "styled-components";
import { useDexyStore } from "../../../../store";

function DownloadTab() {
  const { uploads, ftdCid, setFtdCid } = useDexyStore();

  function download(cid: string) {
    let filename = "file";
    try {
      var filenames = uploads.filter((item) => item.cid === cid);
      filename = filenames[filenames.length - 1].fileName;
    } catch (error) {
      console.log(error);
    }
    console.log(filename);
    console.log(cid);
    fetch(`${constants.baseUrl}/api/codex/v1/download/${cid}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      });
  }

  return (
    <DownloadTabWrapper>
      <input
        type="text"
        placeholder="CID"
        onChange={(e) => {
          setFtdCid(e.target.value);
        }}
        value={ftdCid}
      />
      <div id="divider"></div>
      {/* <input
        type="text"
        placeholder="Filename"
        onChange={(e) => setFilename(e.target.value)}
      /> */}
      <button onClick={() => download(ftdCid)}>Download</button>
    </DownloadTabWrapper>
  );
}

export default DownloadTab;

const DownloadTabWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 70%;

  input {
    flex: 2;
    height: 100%;
    padding: 10px 20px;
    border: none;
    background-color: ${constants.surfaceColor};
    color: ${constants.onSurfaceColor};
  }

  input:nth-child(1) {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  #divider {
    width: 2.5px;
    height: 100%;
    background-color: #555555;
  }

  button {
    flex: 1;
    height: 100%;
    border: none;
    background-color: ${constants.primaryColor};
    color: ${constants.onPrimaryColor};
    font-size: 1rem;
    cursor: pointer;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  @media (max-width: 1180px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 85%;
  }

  @media (max-width: 450px) {
    width: 90%;
  }
`;
