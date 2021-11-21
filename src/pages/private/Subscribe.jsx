/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import Welcome from '../../components/shared/WelcomeUser';
import BackButton from '../../components/shared/BackButton';
import Logout from '../../components/shared/Logout';
import Loading from '../../components/shared/Loading';
import Message from '../../components/shared/Message';
import DropdownInput from '../../components/Dropdown';
import ChooseWantedItems from '../../components/ChooseWantedItems';
import Input from '../../components/shared/Input';
import { getToken, storeToken } from '../../shared/tokenManager';
import { getUsername } from '../../shared/usernameManager';
import { persistLogin, subscribeUser } from '../../services/api';
import { throwError, throwSuccess } from '../../shared/ThrowMessages';
import image from '../../assets/images/image03.jpg';

function Subscribe() {
  const token = getToken();
  const username = getUsername();
  const [initialLoading, setInitialLoading] = useState(true);
  const [plan, setPlan] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [wantedItems, setWantedItems] = useState([]);
  const [name, setName] = useState(
    username[0].toUpperCase() + username.substring(1)
  );
  const [zipcode, setZipcode] = useState('');
  const [adress, setAdress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { search } = useLocation();
  const page = new URLSearchParams(search).get('page');
  const selectedPlan = new URLSearchParams(search).get('plan');

  useEffect(() => {
    if (page) {
      if (!plan || !deliveryDate || !wantedItems.length) {
        navigate('/subscribe');
      }
    }
  }, [page]);

  useEffect(() => {
    if (selectedPlan === 'Mensal' || selectedPlan === 'Semanal') {
      setPlan(selectedPlan);
    }
  }, []);

  useEffect(() => {
    persistLogin(token)
      .then((response) => {
        storeToken(response.data);
        setInitialLoading(false);
      })
      .catch(() => navigate('/'));
  }, [token]);

  useEffect(() => {
    setDeliveryDate('');
  }, [plan]);

  const Dropdowns = [
    {
      name: 'Plano',
      setState: setPlan,
      state: plan,
      possibleStates: ['Mensal', 'Semanal'],
    },
    {
      name: 'Entrega',
      setState: setDeliveryDate,
      state: deliveryDate,
      possibleStates:
        plan === 'Mensal' ? ['01', '10', '20'] : ['Segunda', 'Terça', 'Quarta'],
    },
  ];

  const handleNextPage = () => {
    if (!plan) {
      throwError('Escolha um plano');
    } else if (!deliveryDate) {
      throwError('Escolha uma data de entrega');
    } else if (wantedItems.length < 1) {
      throwError('Escolha um item ao menos');
    } else {
      navigate('?page=2');
    }
  };

  const handleCep = () => {
    if (zipcode.length === 5) {
      setZipcode(`${zipcode}-`);
    }
    if (zipcode.length === 9) {
      setLoading(true);
      axios
        .get(`https://brasilapi.com.br/api/cep/v1/${zipcode.replace('-', '')}`)
        .then((response) => {
          setState(response.data.state);
          setCity(response.data.city);
          setAdress(response.data.street);
          setLoading(false);
        })
        .catch(() => {
          throwError('CEP inválido');
          setLoading(false);
        });
    }
  };

  const handleNumber = () => {
    setAdress(`${adress.split(',')[0]}, ${number}`);
  };

  const userInputs = [
    {
      setState: setName,
      state: name,
      placeholder: 'Nome completo',
      inputType: 'string',
    },
    {
      setState: setZipcode,
      state: zipcode,
      placeholder: 'CEP',
      inputType: 'string',
      onSubmit: handleCep,
      maxLength: 9,
    },
    {
      setState: setAdress,
      state: adress,
      placeholder: 'Endereço',
      inputType: 'string',
      disabled: 1,
    },
  ];

  const customWidthInputs = [
    {
      setState,
      state,
      placeholder: 'Estado',
      inputType: 'string',
      disabled: 1,
      customWidth: '20%',
    },
    {
      setState: setCity,
      state: city,
      placeholder: 'Cidade',
      inputType: 'string',
      disabled: 1,
      customWidth: '50%',
    },
    {
      setState: setNumber,
      state: number,
      onSubmit: handleNumber,
      placeholder: 'Número',
      inputType: 'string',
      customWidth: '25%',
      maxLength: 4,
      disabled: !adress,
    },
  ];

  const handleSubmit = () => {
    if (!zipcode) {
      throwError('Insira seu CEP');
    } else if (!number) {
      throwError('Insira o número da sua casa');
    } else {
      subscribeUser(
        plan === 'Mensal' ? 'monthly' : 'weekly',
        deliveryDate,
        wantedItems,
        zipcode.replace('-', ''),
        number,
        token
      )
        .then(() => {
          throwSuccess('Assinatura realizada com sucesso!');
          navigate('/subscription');
        })
        .catch((error) => {
          if (error.response.status === 400) {
            throwError('Dados inválidos, confira seus campos');
          } else {
            throwError(
              'Você já tem uma inscrição, confira a sua atual para alterá-la'
            );
          }
        });
    }
  };

  if (initialLoading) {
    return <Loading />;
  }

  return (
    <>
      <SubscribePage>
        <Top>
          <Welcome user={username?.split(' ')[0]} />
        </Top>
        <Message message="“Agradecer é arte de atrair coisas boas”" />
        {page ? (
          <>
            <Container>
              <Image src={image} />
              {userInputs.map((input) => (
                <Input
                  setInfo={input.setState}
                  userInfo={input.state}
                  placeholder={input.placeholder}
                  inputType={input.inputType}
                  loading={loading}
                  subscribePage={1}
                  onSubmit={input.onSubmit}
                  maxLength={input.maxLength}
                  disabled={input.disabled}
                  customWidth={input.customWidth}
                  key={input.placeholder}
                />
              ))}
              <HorizontalContainer>
                {customWidthInputs.map((input) => (
                  <Input
                    setInfo={input.setState}
                    userInfo={input.state}
                    placeholder={input.placeholder}
                    inputType={input.inputType}
                    loading={loading}
                    subscribePage={1}
                    onSubmit={input.onSubmit}
                    maxLength={input.maxLength}
                    disabled={input.disabled}
                    customWidth={input.customWidth}
                    key={input.placeholder}
                  />
                ))}
              </HorizontalContainer>
            </Container>
            <Action onClick={handleSubmit}>Próximo</Action>
          </>
        ) : (
          <>
            <Container>
              <Image src={image} />
              {Dropdowns.map((dropdown) => (
                <DropdownInput
                  name={dropdown.name}
                  setState={dropdown.setState}
                  state={dropdown.state}
                  possibleStates={dropdown.possibleStates}
                  key={dropdown.name}
                />
              ))}
              <ChooseWantedItems
                setState={setWantedItems}
                state={wantedItems}
              />
            </Container>
            <Action onClick={handleNextPage}>Próximo</Action>
          </>
        )}
      </SubscribePage>
      <BackButton loading={loading ? 1 : 0} />
      <Logout loading={loading ? 1 : 0} />
    </>
  );
}

export default Subscribe;

const SubscribePage = styled.main`
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
  margin-bottom: 30px;
  background-color: #ffffff;

  input {
    margin-bottom: 15px;
  }
`;

const Image = styled.img`
  width: 100%;
  margin: 0px;
  border-radius: 50px;
`;

const HorizontalContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Action = styled.button`
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
