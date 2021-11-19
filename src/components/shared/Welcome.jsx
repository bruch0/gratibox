import React from 'react';
import styled from 'styled-components';

function Welcome() {
  return (
    <WelcomeUser>
      Bem vindo ao <span>Gratibox</span>
    </WelcomeUser>
  );
}

const WelcomeUser = styled.p`
  font-size: 7vw;
  font-weight: 500;
  text-align: center;

  span {
    font-weight: 700;
  }
`;

export default Welcome;
