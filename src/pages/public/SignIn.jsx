/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

import Welcome from '../../components/shared/WelcomeVisitant';
import UserInput from '../../components/shared/Input';
import BackButton from '../../components/shared/BackButton';
import { throwError } from '../../shared/ThrowMessages';
import { signInUser } from '../../services/api';
import { storeToken } from '../../shared/tokenManager';
import { storeUsername } from '../../shared/usernameManager';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userInfo = [
    {
      state: email,
      setState: setEmail,
      placeholder: 'E-mail',
      type: 'email',
    },
    {
      state: password,
      setState: setPassword,
      placeholder: 'Senha',
      type: 'password',
    },
  ];

  const handleSubmit = (e) => {
    const emailRegex = /[a-zA-Z0-9]+@+[a-zA-Z0-9]+\.+[a-zA-Z0-9]/;
    if (e === 'Enter' || e === 'click') {
      if (!email) {
        throwError('Insira seu e-mail');
      } else if (!emailRegex.test(email)) {
        throwError('Insira um e-mail válido');
      } else if (!password) {
        throwError('Insira sua senha');
      } else if (password.length < 8) {
        throwError('A senha contém ao menos 8 caractéres');
      } else {
        setLoading(true);
        signInUser(email, password)
          .then((response) => {
            storeToken(response.data.token);
            storeUsername(response.data.name);
            navigate('/subscription');
          })
          .catch((error) => {
            if (error.response.status === 400) {
              throwError('Ocorreu um erro, confira os campos');
            } else if (error.response.status === 404) {
              throwError('E-mail não registrado');
            } else {
              throwError('Senha incorreta');
            }
            setLoading(false);
          });
      }
    }
  };

  return (
    <>
      <SignInPage>
        <Top>
          <Welcome />
        </Top>
        <Form autoComplete="nope">
          {userInfo.map((info) => (
            <UserInput
              setInfo={info.setState}
              userInfo={info.state}
              placeholder={info.placeholder}
              inputType={info.type}
              key={info.placeholder}
              onSubmit={handleSubmit}
              loading={loading}
            />
          ))}
        </Form>
        <SignInButton
          loading={loading ? 1 : 0}
          onClick={(e) => handleSubmit(e.type)}
        >
          {loading ? (
            <Loader type="ThreeDots" color="#FFFFFF" height={45} width={100} />
          ) : (
            'Login'
          )}
        </SignInButton>
      </SignInPage>
      <BackButton loading={loading ? 1 : 0} fixNavigation="/" />
    </>
  );
}

export default SignIn;

const SignInPage = styled.main`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #6d7ce4;
`;

const Top = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const SignInButton = styled.button`
  width: 50%;
  padding: ${(props) => (props.loading ? '0px' : '15px 10px')};
  margin: 0px;
  border-radius: 10px;
  border: none;
  font-size: 4vw;
  font-weight: 700;
  color: white;
  background-color: #8c97ea;
  pointer-events: ${(props) => (props.loading ? 'none' : '')};
`;

const Form = styled.form`
  width: 90%;

  input {
    margin-bottom: 15px;
  }
`;
