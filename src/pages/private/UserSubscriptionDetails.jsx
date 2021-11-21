/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';

import Welcome from '../../components/shared/WelcomeUser';
import BackButton from '../../components/shared/BackButton';
import Logout from '../../components/shared/Logout';
import Loading from '../../components/shared/Loading';
import Message from '../../components/shared/Message';
import { getToken, storeToken } from '../../shared/tokenManager';
import { getUsername } from '../../shared/usernameManager';
import { requestUserInfo } from '../../services/api';
import image from '../../assets/images/image03.jpg';

function UserSubscriptionDetails() {
  const token = getToken();
  const username = getUsername();
  const [userInfo, setUserInfo] = useState({
    plan: '',
    subscriptionDate: '',
    wantedItems: [],
    dates: [],
  });
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  const sortDates = (dates) => {
    dates.sort((a, b) => {
      const auxA = a.date.split('/');
      const fixedDateA = `${auxA[1]}/${auxA[0]}/${auxA[2]}`;
      const auxB = b.date.split('/');
      const fixedDateB = `${auxB[1]}/${auxB[0]}/${auxB[2]}`;
      return dayjs(fixedDateA) - dayjs(fixedDateB);
    });

    return dates;
  };

  useEffect(() => {
    requestUserInfo(token)
      .then((response) => {
        if (response.data.newToken) {
          storeToken(response.data.newToken);
        }
        setInitialLoading(false);
        setUserInfo({
          plan: response.data.subscriptionName,
          subscriptionDate: response.data.subscriptionDate,
          wantedItems: response.data.wantedItems,
          dates: sortDates(response.data.dates),
        });
      })
      .catch(() => navigate('/sign-in'));
  }, [token]);

  const infos = [
    {
      name: 'Plano: ',
      info: userInfo.plan === 'monthly' ? 'Mensal' : 'Semanal',
    },
    {
      name: 'Data de assinatura: ',
      info: userInfo.subscriptionDate,
    },
  ];

  if (initialLoading) {
    return <Loading />;
  }

  return (
    <>
      <SubscriptionDetailsPage>
        <Top onClick={() => sortDates(userInfo.dates)}>
          <Welcome user={username?.split(' ')[0]} />
        </Top>
        <Message message="“Agradecer é arte de atrair coisas boas”" />
        <Container>
          <Image src={image} />
          {infos.map((info) => (
            <Info key={info.name}>
              {info.name} <span>{info.info}</span>
            </Info>
          ))}
          <Info>
            Próximas entregas: <br />
            <span>{userInfo.dates[0]?.date}</span>
            <br />
            <span>{userInfo.dates[1]?.date}</span>
            <br />
            <span>{userInfo.dates[2]?.date}</span>
          </Info>
          <WantedItemsContainer>
            {userInfo.wantedItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </WantedItemsContainer>
        </Container>
        <Action to="/feedback">Avaliar entregas</Action>
        <Action
          to={{
            pathname: '/subscribe',
            state: { prevPath: '/user-subscription' },
          }}
        >
          Mudar plano
        </Action>
      </SubscriptionDetailsPage>
      <BackButton loading={0} />
      <Logout loading={0} />
    </>
  );
}

export default UserSubscriptionDetails;

const SubscriptionDetailsPage = styled.main`
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
  margin-bottom: 20px;
  background-color: #ffffff;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 50px;
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

const Info = styled.div`
  width: 95%;
  color: #4d65a8;
  font-size: 5.5vw;
  font-weight: 700;
  margin-bottom: 10px;

  span {
    color: #e63c80;
    display: inline-block;
    margin-bottom: 5px;
  }
`;

const WantedItemsContainer = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0px 0px 0px;
  span {
    color: #e63c80;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
  }
`;
