/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

import Welcome from '../../components/shared/WelcomeUser';
import Logout from '../../components/shared/Logout';
import Loading from '../../components/shared/Loading';
import HasNoSubscription from '../../components/HasNoSubscription';
import SubscriptionDetails from '../../components/SubscriptionDetails';
import { getToken, storeToken } from '../../shared/tokenManager';
import { getUsername } from '../../shared/usernameManager';
import {
  requestUserSubscription,
  requestBoxesUpdate,
} from '../../services/api';
import image from '../../assets/images/image04.jpg';

function UserSubscription() {
  const token = getToken();
  const username = getUsername();
  const [subscriptionName, setSubscriptionName] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    requestBoxesUpdate(token)
      .then((response) => {
        if (response.data.newToken) {
          storeToken(response.data.newToken);
        }
      })
      .catch(() => navigate('/sign-in'));
    requestUserSubscription(token)
      .then((response) => {
        setSubscriptionName(response.data.subscriptionName);
      })
      .catch(() => navigate('/sign-in'));
  }, [token]);

  if (subscriptionName === false) {
    return <Loading />;
  }

  return (
    <>
      <UserSubscriptionpage>
        <Top>
          <Welcome user={username?.split(' ')[0]} />
        </Top>
        {subscriptionName === null ? <HasNoSubscription /> : ''}
        <Container>
          <Image src={image} />
          <SubscriptionDetails subscriptionName={2} />
          <Action
            to={
              subscriptionName === 'weekly'
                ? '/subscription-details'
                : '/subscribe?plan=Semanal'
            }
          >
            {subscriptionName === 'weekly' ? 'Conferir assinatura' : 'Assinar'}
          </Action>
        </Container>
        <Container>
          <Image src={image} />
          <SubscriptionDetails subscriptionName={1} />
          <Action
            to={
              subscriptionName === 'monthly'
                ? '/subscription-details'
                : '/subscribe?plan=Mensal'
            }
          >
            {subscriptionName === 'monthly' ? 'Conferir assinatura' : 'Assinar'}
          </Action>
        </Container>
      </UserSubscriptionpage>
      <Logout loading={0} />
    </>
  );
}

export default UserSubscription;

const UserSubscriptionpage = styled.main`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #6d7ce4;
`;

const Top = styled.div`
  width: 100%;
  height: 30vw;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Container = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  padding: 0px 5% 20px 5%;
  margin-bottom: 50px;
  background-color: #e5cdb1;
  overflow: hidden;

  > * {
    margin-bottom: 15px;
  }
`;

const Image = styled.img`
  width: 100%;
`;

const Action = styled(Link)`
  width: 50%;
  padding: 15px 10px;
  margin: 0px 0px 15px 0px;
  border-radius: 10px;
  border: none;
  font-size: 4vw;
  font-weight: 700;
  color: white;
  text-align: center;
  background-color: #8c97ea;
`;
