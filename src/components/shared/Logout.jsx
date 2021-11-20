/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdLogout } from 'react-icons/md';
import { removeToken } from '../../shared/tokenManager';
import { removeUsername } from '../../shared/usernameManager';

function Logout({ loading }) {
  const navigate = useNavigate();

  return (
    <LogoutButton
      onClick={() => {
        removeToken();
        removeUsername();
        navigate('/');
      }}
      loading={loading ? 1 : 0}
    >
      <MdLogout />
    </LogoutButton>
  );
}

export default Logout;

const LogoutButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  margin: 0px;
  padding: 0px;
  background-color: transparent;
  position: absolute;
  top: 2%;
  right: 2%;
  pointer-events: ${(props) => (props.loading ? 'none' : '')};

  svg {
    color: white;
    width: 60%;
    height: 60%;
  }
`;
