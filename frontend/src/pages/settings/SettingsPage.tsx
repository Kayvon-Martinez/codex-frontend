import React from "react";
import styled from "styled-components";
import Header from "../../components/layout/partials/Header";
import constants from "../../util/Constants";
import { useDexyStore } from "../../store";

function SettingsPage() {
  const { nodeBaseUrl, setNodeBaseUrl } = useDexyStore();

  const [nodeBaseUrlInput, setNodeBaseUrlInput] = React.useState(nodeBaseUrl);

  return (
    <SettingsPageWrapper>
      <Header title="Settings" />
      <main>
        <div className="inputs">
          <h4>Node Base URL</h4>
          <h5>(e.g. http://localhost:8080)</h5>
          <input
            type="text"
            placeholder="Node base URL (default is http://localhost:8080)"
            value={nodeBaseUrlInput}
            onChange={(e) => setNodeBaseUrlInput(e.target.value)}
          />
          {/* <input type="text" placeholder="Node username" />
          <input type="text" placeholder="Node password" /> */}
          <button
            onClick={() => {
              setNodeBaseUrl(nodeBaseUrlInput);
            }}
          >
            <span>Save</span>
          </button>
        </div>
      </main>
    </SettingsPageWrapper>
  );
}

export default SettingsPage;

const SettingsPageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 16px 0px;
  }

  h1 {
    color: ${constants.onSurfaceColor};
    font-size: 24px;
    margin: 16px;
  }

  .inputs {
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #141414;
    border-radius: 8px;
    width: 50%;
  }

  h4 {
    color: ${constants.onSurfaceColor};
  }

  h5 {
    color: ${constants.onSurfaceColor};
    font-size: 0.8rem;
    margin-top: 8px;
  }

  input {
    height: 60px;
    padding: 10px 20px;
    border: none;
    background-color: ${constants.surfaceColor};
    color: ${constants.onSurfaceColor};
    width: 100%;
    border-radius: 8px;
    margin: 16px 0px;
    border: 2px dashed #9e9e9e;
    border-radius: 8px;
    text-align: center;
  }

  input:focus {
    outline: none;
    border: 2px solid ${constants.primaryColor};
  }

  button {
    height: 40px;
    border: none;
    background-color: ${constants.primaryColor};
    color: ${constants.onPrimaryColor};
    font-size: 1rem;
    cursor: pointer;
    border-radius: 8px;
    width: 80px;
  }

  button span {
    font-weight: bold;
  }

  @media (max-width: 1180px) {
    .inputs {
      width: 80%;
    }
  }

  @media (max-width: 768px) {
    .inputs {
      width: 85%;
    }
  }

  @media (max-width: 450px) {
    .inputs {
      width: 90%;
    }
  }
`;
