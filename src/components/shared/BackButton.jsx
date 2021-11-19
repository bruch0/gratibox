import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function BackButton() {
  const navigate = useNavigate();

  return (
    <GoBackButton onClick={() => navigate(-1)}>
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

  svg {
    color: white;
    width: 60%;
    height: 60%;
  }
`;
