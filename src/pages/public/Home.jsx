/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

import Welcome from '../../components/shared/WelcomeVisitant';
import Loading from '../../components/shared/Loading';
import { getToken, storeToken } from '../../shared/tokenManager';
import { persistLogin } from '../../services/api';
import image from '../../assets/images/image05.webp';

function Home() {
  const token = getToken();
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    persistLogin(token)
      .then((response) => {
        storeToken(response.data);
        navigate('/subscription');
      })
      .catch(() => setInitialLoading(false));
  }, []);

  if (initialLoading) {
    return <Loading />;
  }

  return (
    <Homepage>
      <Top>
        <Welcome />
        <Disclaimer>
          Receba em casa um box com chás, produtos organicos, incensos e muito
          mais...
        </Disclaimer>
      </Top>
      <Image src={image} />
      <Bottom>
        <SignUp to="/sign-up">Quero começar</SignUp>
        <SignIn to="/sign-in">Já sou grato</SignIn>
      </Bottom>
    </Homepage>
  );
}

export default Home;

const Homepage = styled.main`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #6d7ce4;
`;

const Disclaimer = styled.p`
  font-size: 5vw;
  font-weight: 300;
  text-align: center;
  padding: 0px 10%;
`;

const Image = styled.img`
  width: 100%;
`;

const Bottom = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #4d65a8;
`;

const SignUp = styled(Link)`
  width: 50%;
  padding: 15px 10px;
  margin: 0px;
  border-radius: 10px;
  border: none;
  font-size: 4vw;
  font-weight: 700;
  color: white;
  text-align: center;
  background-color: #8c97ea;
`;

const SignIn = styled(Link)`
  width: 50%;
  padding: 15px 10px;
  margin: 0px;
  border-radius: 10px;
  border: none;
  font-size: 4vw;
  font-weight: 700;
  color: white;
  text-align: center;
  background-color: transparent;
`;
