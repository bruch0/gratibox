/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

function DropdownInput({ name, setState, state, possibleStates }) {
  const [enabled, setEnabled] = useState(false);
  return (
    <DropdownHolder>
      <Dropdown
        onClick={() => setEnabled(!enabled)}
        onBlur={() => setTimeout(() => setEnabled(false), 1)}
        enabled={enabled ? 1 : 0}
      >
        {enabled || !state ? name : state}
        {enabled ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
      </Dropdown>
      <DropdownList enabled={enabled ? 1 : 0}>
        {possibleStates.map((stateChoice) => (
          <Item key={stateChoice} onClick={() => setState(stateChoice)}>
            {stateChoice}
          </Item>
        ))}
      </DropdownList>
    </DropdownHolder>
  );
}

const DropdownHolder = styled.div`
  width: 90%;
  position: relative;
`;

const Dropdown = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  border: 0px;
  border-radius: ${(props) => (props.enabled ? '10px 10px 0px 0px;' : '10px')};
  background-color: #e8dff0;
  font-size: 20px;
  font-weight: 700;
  color: #4d65a8;
  margin-bottom: 15px;

  svg {
    height: 30px;
    width: 30px;
  }
`;

const DropdownList = styled.ul`
  width: 100%;
  max-height: 100px;
  overflow-y: scroll;
  position: absolute;
  top: 50px;
  z-index: 1;
  display: ${(props) => (props.enabled ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  border-radius: 0px 0px 10px 10px;
  background-color: #e8dff0;
  font-size: 20px;
  font-weight: 700;
`;

const Item = styled.li`
  width: 100%;
  height: 50px;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  color: #4d65a8;
`;

export default DropdownInput;
