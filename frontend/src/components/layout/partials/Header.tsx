import React from "react";
import styled from "styled-components";

function Header(props: { title: string }) {
  return (
    <HeaderWrapper>
      <h1>{props.title}</h1>
    </HeaderWrapper>
  );
}

export default Header;

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 75px;
  width: 100%;
  background-color: #141414;
  padding: 16px;

  @media (max-width: 768px) {
    display: none;
  }
`;
