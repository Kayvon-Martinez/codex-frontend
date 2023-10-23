import React, { useState } from "react";
import styled from "styled-components";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

function DropDownList(props: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <DropDownListWrapper>
      <div id="title">
        <h3>{props.title}</h3>

        {(open && (
          <MdExpandLess size={28} onClick={() => setOpen(!open)} />
        )) || <MdExpandMore size={28} onClick={() => setOpen(!open)} />}
      </div>
      <div
        id="items"
        style={{
          display: open ? "flex" : "none",
        }}
      >
        {open && props.children}
      </div>
    </DropDownListWrapper>
  );
}

export default DropDownList;

const DropDownListWrapper = styled.div`
  display: flex;
  flex-direction: column;

  #title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  #items {
    display: flex;
    flex-direction: column;
    padding: 5px;
  }

  #items > * {
    border: 2px dashed #9e9e9e;
    border-radius: 8px;
  }
`;
