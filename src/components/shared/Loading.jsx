/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LoadingIcon } from '../../assets/loading/loading.svg';

function Loading() {
  return (
    <Load>
      <LoadIcon />
    </Load>
  );
}

export default Loading;

const LoadIcon = styled(LoadingIcon)`
  width: 80%;
`;

const Load = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6d7ce4;
`;
