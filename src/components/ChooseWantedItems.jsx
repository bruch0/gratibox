/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';
import styled from 'styled-components';
import { FiSquare, FiCheckSquare } from 'react-icons/fi';

function ChooseWantedItems({ setState, state }) {
  const removeItem = (item) => {
    const index = state.indexOf(item);
    state.splice(index, 1);
    setState([...state]);
  };

  return (
    <ItemsHolder>
      Quero receber
      <Option
        onClick={() =>
          state.indexOf(1) === -1 ? setState([...state, 1]) : removeItem(1)
        }
      >
        {state.indexOf(1) !== -1 ? <FiCheckSquare /> : <FiSquare />}
        Chás
      </Option>
      <Option
        onClick={() =>
          state.indexOf(2) === -1 ? setState([...state, 2]) : removeItem(2)
        }
      >
        {state.indexOf(2) !== -1 ? <FiCheckSquare /> : <FiSquare />}
        Produtos orgânicos
      </Option>
      <Option
        onClick={() =>
          state.indexOf(3) === -1 ? setState([...state, 3]) : removeItem(3)
        }
      >
        {state.indexOf(3) !== -1 ? <FiCheckSquare /> : <FiSquare />}
        Incensos
      </Option>
    </ItemsHolder>
  );
}

const ItemsHolder = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-weight: 700;
  color: #4d65a8;
  background-color: #e8dff0;
  padding: 10px;
  border-radius: 10px;
`;

const Option = styled.button`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0px;
  margin: 15px 0px 10px 0px;
  border: 0px;
  background-color: #e8dff0;
  font-size: 18px;
  font-weight: 500;
  color: #4d65a8;
  text-align: start;

  svg {
    height: 30px;
    width: 30px;
    margin-right: 10px;
  }

  :active {
    svg {
      transform: translateY(1px);
    }
  }
`;

export default ChooseWantedItems;
