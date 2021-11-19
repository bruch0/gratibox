import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

import Welcome from '../../components/shared/Welcome';
import UserInput from '../../components/shared/Input';
import BackButton from '../../components/shared/BackButton';
import { throwError, throwSuccess } from '../../shared/ThrowMessages.js';
import { signUpUser } from '../../services/api.js';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userInfo = [
    {
      state: name,
      setState: setName,
      placeholder: 'Nome',
      type: 'text',
    },
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
    {
      state: repeatPassword,
      setState: setRepeatPassword,
      placeholder: 'Repita a senha',
      type: 'password',
    },
  ];

  const handleSubmit = (e) => {
    const emailRegex = /[a-zA-Z0-9]+\@+[a-zA-Z0-9]+\.+[a-zA-Z0-9]/;
    if (e === 'Enter' || e === 'click') {
      if (!name) {
        throwError('Insira seu nome');
      } else if (name.length < 3) {
        throwError('Seu nome de usuário deve conter ao menos 3 caractéres');
      } else if (!email) {
        throwError('Insira seu e-mail');
      } else if (!emailRegex.test(email)) {
        throwError('Insira um e-mail válido');
      } else if (!password) {
        throwError('Insira sua senha');
      } else if (password.length < 8) {
        throwError('Sua senha deve conter ao menos 8 caractéres');
      } else if (!repeatPassword) {
        throwError('Repita sua senha');
      } else if (repeatPassword !== password) {
        throwError('Senhas não conferem');
      } else {
        setLoading(true);
        signUpUser(name, email, password)
          .then(() => {
            throwSuccess('Cadastrado com sucesso!');
            navigate('/sign-in');
          })
          .catch((error) => {
            if (error.response.status === 400) {
              throwError('Ocorreu um erro, confira os campos');
            } else {
              throwError('E-mail já registrado');
            }
          });
        setLoading(false);
      }
    }
  };

  return (
    <>
      <SignUpPage>
        <Top>
          <Welcome />
        </Top>
        <Form autoComplete="nope">
          {userInfo.map((info, index) => (
            <UserInput
              setInfo={info.setState}
              userInfo={info.state}
              placeholder={info.placeholder}
              inputType={info.type}
              key={index}
              onEnter={handleSubmit}
              loading={loading}
            />
          ))}
        </Form>
        <SignUpButton
          loading={loading ? 1 : 0}
          onClick={(e) => handleSubmit(e.type)}
        >
          {loading ? (
            <Loader type="ThreeDots" color="#FFFFFF" height={45} width={100} />
          ) : (
            'Quero começar'
          )}
        </SignUpButton>
      </SignUpPage>
      <BackButton />
    </>
  );
}

export default SignUp;

const SignUpPage = styled.main`
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

const SignUpButton = styled.button`
  width: 50%;
  padding: ${(props) => (props.loading ? '0px' : '15px 10px')};
  margin: 0px;
  border-radius: 10px;
  border: none;
  font-size: 4vw;
  font-weight: 700;
  color: white;
  background-color: #8c97ea;
`;

const Form = styled.form`
  width: 90%;

  input {
    margin-bottom: 15px;
  }
`;
