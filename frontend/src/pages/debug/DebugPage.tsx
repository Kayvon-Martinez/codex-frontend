import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Convert,
  DebugNodeInfoModel,
} from "../../data/models/DebugNodeInfoModel";
import NodeInfoItemComponent from "../../components/nodeInfoItem/NodeInfoItemComponent";
import Header from "../../components/layout/partials/Header";
import { useDexyStore } from "../../store";

function DebugPage() {
  const { nodeBaseUrl } = useDexyStore();

  const [statusInfo, setStatusInfo] = React.useState<
    DebugNodeInfoModel | undefined
  >();

  useEffect(() => {
    axios.get(`${nodeBaseUrl}/api/codex/v1/debug/info`).then((response) => {
      setStatusInfo(
        Convert.toDebugNodeInfoModel(JSON.stringify(response.data))
      );
    });
  }, [nodeBaseUrl]);

  console.log(statusInfo);
  return (
    <DebugPageWrapper>
      <Header title="Node Info" />
      <main>{statusInfo && <NodeInfoItemComponent data={statusInfo!!} />}</main>
    </DebugPageWrapper>
  );
}

export default DebugPage;

const DebugPageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  main {
    margin-top: auto;
    margin-bottom: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .scroll {
  }
`;
