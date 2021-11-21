/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';
import styled from 'styled-components';

function Welcome({ user, disclaimer }) {
  return (
    <>
      <WelcomeUser>
        Bom te ver por aqui,{' '}
        <span>{user[0].toUpperCase() + user.substring(1)}</span>
      </WelcomeUser>
      {disclaimer ? (
        <Disclaimer>
          Receba em casa um box com chás, produtos organicos, incensos e muito
          mais...
        </Disclaimer>
      ) : (
        ''
      )}
    </>
  );
}

const WelcomeUser = styled.p`
  font-size: 6vw;
  font-weight: 500;
  text-align: center;

  span {
    font-weight: 700;
  }
`;

const Disclaimer = styled.p`
  font-size: 5vw;
  font-weight: 300;
  text-align: center;
  padding: 0px 10%;
`;

export default Welcome;
