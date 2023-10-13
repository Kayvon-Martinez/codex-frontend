import styled from "styled-components";
import NavigationItem from "./NavigationItem";

import {
  MdOutlineHome,
  MdStore,
  MdDataUsage,
  MdDeviceHub,
  MdBugReport,
} from "react-icons/md";

function NavigationRail() {
  return (
    <NavigationRailWrapper>
      <h1>Dexy</h1>
      <ul>
        <NavigationItem name="Home" icon={MdOutlineHome} link="/" />
        <NavigationItem name="Marketplace" icon={MdStore} link="/marketplace" />
        <NavigationItem name="Data" icon={MdDataUsage} link="/data" />
        <NavigationItem name="Node" icon={MdDeviceHub} link="/node" />
        <NavigationItem name="Debug" icon={MdBugReport} link="/debug" />
      </ul>
    </NavigationRailWrapper>
  );
}

export default NavigationRail;

const NavigationRailWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100px;
  background-color: #141414;
  padding: 16px;

  ul {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    list-style: none;
    padding: 0;
    margin: 0;
    height: 100%;
  }

  a:link {
    text-decoration: none;
  }

  a:visited {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  a:active {
    text-decoration: none;
  }

  a {
    color: #fefefe;
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    height: 100px;
    width: 100%;
    padding: 0;

    ul {
      flex-direction: row;
      height: 100%;
      width: 100%;
    }

    h1 {
      display: none;
    }
  }
`;
