/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function BackButton({ loading }) {
  const navigate = useNavigate();

  return (
    <GoBackButton onClick={() => navigate(-1)} loading={loading ? 1 : 0}>
      <AiOutlineArrowLeft />
    </GoBackButton>
  );
}

export default BackButton;

const GoBackButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: none;
  margin: 0px;
  padding: 0px;
  background-color: #4d65a8;
  position: fixed;
  top: 2%;
  left: 2%;
  pointer-events: ${(props) => (props.loading ? 'none' : '')};

  svg {
    color: white;
    width: 60%;
    height: 60%;
  }
`;
