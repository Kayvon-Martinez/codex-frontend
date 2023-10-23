import React from "react";
import styled from "styled-components";
import { DebugNodeInfoModel } from "../../data/models/DebugNodeInfoModel";
import DropDownList from "../layout/dropDownList/DropDownList";

function NodeInfoItemComponent(props: {
  data: DebugNodeInfoModel | undefined;
}) {
  return (
    (props.data && (
      <NodeInfoItemComponentWrapper>
        <div id="info-row">
          <p>
            <span>Adresses: </span>
            {props.data.addrs.join(", ")}
          </p>
          <p>
            <span>Codex Version: </span>
            {`${props.data.codex.version} (${props.data.codex.revision})`}
          </p>
        </div>
        <div id="info-row">
          <p>
            <span>ID: </span>
            {props.data.id}
          </p>
          <p>
            <span>Repo: </span>
            {props.data.repo}
          </p>
        </div>
        <div id="info-row">
          <p>
            <span>SPR: </span>
            {props.data.spr}
          </p>
        </div>
        <div>
          <h3>Local Node</h3>
          <div id="info-row">
            <p>
              <span>Address: </span>
              {props.data.table.localNode.address}
            </p>
            <p>
              <span>Node ID: </span>
              {props.data.table.localNode.nodeId}
            </p>
          </div>
          <div id="info-row">
            <p>
              <span>Peer ID: </span>
              {props.data.table.localNode.peerId}
            </p>
            <p>
              <span>Seen: </span>
              {`${props.data.table.localNode.seen
                .toString()[0]
                .toUpperCase()}${props.data.table.localNode.seen
                .toString()
                .slice(1)}`}
            </p>
          </div>
        </div>
        <DropDownList title="Nodes">
          {props.data.table.nodes.map((node, index) => (
            <div key={index}>
              <h3>Node {index + 1}</h3>
              <div id="info-row">
                <p>
                  <span>Address: </span>
                  {node.address}
                </p>
                <p>
                  <span>Node ID: </span>
                  {node.nodeId}
                </p>
              </div>
              <div id="info-row">
                <p>
                  <span>Peer ID: </span>
                  {node.peerId}
                </p>
                <p>
                  <span>Seen: </span>
                  {`${node.seen.toString()[0].toUpperCase()}${node.seen
                    .toString()
                    .slice(1)}`}
                </p>
              </div>
            </div>
          ))}
        </DropDownList>
        <DropDownList title="Record">
          <div id="info-row">
            <p>
              <span>Record: </span>
              {props.data.table.localNode.record}
            </p>
          </div>
        </DropDownList>
      </NodeInfoItemComponentWrapper>
    )) || <></>
  );
}

export default NodeInfoItemComponent;

const NodeInfoItemComponentWrapper = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 10px;
  width: 100%;

  #info-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px;
    margin: 5px;
  }

  h3 {
    padding: 8px;
    margin: 5px;
    font-style: italic;
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
    word-break: break-all;
  }

  p span {
    font-weight: bold;
  }

  #cid {
    flex: 2;
  }
`;
