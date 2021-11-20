/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';
import styled from 'styled-components';

function SubscriptionDetails({ subscriptionId }) {
  return (
    <Details>
      {subscriptionId === 1
        ? 'Você recebe um box por mês. Ideal para quem está começando agora.'
        : 'Você recebe um box por semana. Ideal para quem quer exercer a gratidão todos os dias.'}
    </Details>
  );
}

const Details = styled.p`
  font-size: 5vw;
  color: #4d65a8;
  font-weight: 500;
  text-align: center;
  padding: 0px;
`;

export default SubscriptionDetails;
