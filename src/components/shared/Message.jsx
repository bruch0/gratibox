/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';
import styled from 'styled-components';

function Message({ message }) {
  return <Disclaimer>{message}</Disclaimer>;
}

const Disclaimer = styled.p`
  font-size: 5vw;
  font-weight: 300;
  text-align: center;
  padding: 0px 10%;
  margin-bottom: 50px;
`;

export default Message;
