import React from "react";
import { IconType } from "react-icons";
import styled from "styled-components";

function TabBarView(props: {
  tabIcons: IconType[];
  children: React.ReactNode[];
}) {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <TabBarViewWrapper>
      <div id="tab-wrapper">
        {props.tabIcons.map((icon, index) => (
          <button
            style={{
              color: activeTab === index ? "#6f11db" : "#9e9e9e",
              borderBottom: activeTab === index ? "2px solid #6f11db" : "none",
            }}
            onClick={() => setActiveTab(index)}
            key={index}
          >
            {icon({ size: 24 })}
          </button>
        ))}
      </div>
      <div id="tab-view">{props.children[activeTab]}</div>
    </TabBarViewWrapper>
  );
}

export default TabBarView;

const TabBarViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 0;
  margin: 0;
  height: 100%;

  #tab-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    list-style: none;
    padding: 0;
    margin-bottom: 10px;
    width: 100%;
  }

  #tab-wrapper button {
    flex: 1;
    background-color: #141414;
    color: #9e9e9e;
    border: none;
    padding: 24px;
    cursor: pointer;
    font-size: 1rem;
  }

  #tab-view {
    height: 100%;
    width: 100%;
  }

  @media (min-width: 768px) {
    height: 100vh - 300px !important;
  }
`;
