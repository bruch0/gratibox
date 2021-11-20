/* eslint-disable react/function-component-definition */
import React from 'react';
import styled from 'styled-components';

function Welcome() {
  return (
    <WelcomeVisitant>
      Bem vindo ao <span>Gratibox</span>
    </WelcomeVisitant>
  );
}

const WelcomeVisitant = styled.p`
  font-size: 7vw;
  font-weight: 500;
  text-align: center;

  span {
    font-weight: 700;
  }
`;

export default Welcome;
