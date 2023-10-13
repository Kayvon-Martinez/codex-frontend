import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

function NavigationItem(props: { name: string; icon: IconType; link: string }) {
  let activeNow = useLocation().pathname === props.link;

  return (
    <Link
      to={props.link}
      state={{
        activeNow: window.location.pathname === props.link,
      }}
    >
      <NavigationItemWrapper>
        <props.icon size={24} color={activeNow ? "#6f11db" : "#9e9e9e"} />
        <span
          style={{
            color: activeNow ? "#6f11db" : "#9e9e9e",
          }}
        >
          {props.name}
        </span>
      </NavigationItemWrapper>
    </Link>
  );
}

export default NavigationItem;

const NavigationItemWrapper = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;

  svg {
    margin-bottom: 5px;
  }

  span {
    font-size: 0.8rem;
    text-align: center;
  }
`;
