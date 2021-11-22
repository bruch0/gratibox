/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';

import BackButton from '../../components/shared/BackButton';
import Logout from '../../components/shared/Logout';
import Loading from '../../components/shared/Loading';
import Message from '../../components/shared/Message';
import NegativeFeedbackContainer from '../../components/NegativeFeedbackContainer';
import { getToken, storeToken } from '../../shared/tokenManager';
import { requestDeliveredBoxes, registerFeedback } from '../../services/api';
import { throwSuccess } from '../../shared/ThrowMessages';
import image from '../../assets/images/image01.jpg';
import FeedbackBox from '../../components/FeedbackBox';

function Feedback() {
  const token = getToken();
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [negativeFeedback, setNegativeFeedback] = useState({
    isNegative: false,
    boxDate: '',
    feedbackId: '',
  });
  const [boxId, setBoxId] = useState('');
  const [deliveredBoxes, setDeliveredBoxes] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const page = new URLSearchParams(search).get('page');

  useEffect(() => {
    if (page) {
      if (negativeFeedback.feedbackId !== 2) {
        navigate('/feedback');
      }
    }
  }, [page]);

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
    requestDeliveredBoxes(token)
      .then((response) => {
        if (response.data.newToken) {
          storeToken(response.data.newToken);
        }
        setInitialLoading(false);
        setDeliveredBoxes(sortDates(response.data.dates));
      })
      .catch(() => navigate('/'));
  }, [token]);

  const positiveRating = (idBox) => {
    const filteredBoxes = deliveredBoxes.filter((box) => box.id !== idBox);
    setLoading(true);
    registerFeedback(idBox, 1, token)
      .then(() => {
        throwSuccess('Entrega avaliada com sucesso');
        setDeliveredBoxes(filteredBoxes);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const goToPageTwo = (idBox, boxDate) => {
    setNegativeFeedback({ isNegative: true, boxDate, feedbackId: 2 });
    setBoxId(idBox);
    navigate('?page=2');
  };

  if (initialLoading) {
    return <Loading />;
  }

  return (
    <>
      <FeedbackPage>
        <Top>
          <Title>
            {page
              ? 'Parece que houve um problema com a sua entrega'
              : 'Reserve um tempo para avaliar nossas entregas'}
          </Title>
        </Top>
        <Message
          message={
            page
              ? 'Nem sempre acertamos, por isso a sua avaliação é essencial.'
              : '“Quem agradece é humilde, valoriza a vida e honra a gratidão entre todas as pessoas.”'
          }
        />
        <Container>
          <Image src={image} />
          {!page ? (
            <BoxesContainer>
              {deliveredBoxes.length === 0
                ? 'Você não tem nenhuma entrega para avaliar, volte mais tarde'
                : ''}
              {deliveredBoxes.map((box) => (
                <FeedbackBox
                  key={box.id}
                  boxId={box.id}
                  loading={loading ? 1 : 0}
                  boxDate={box.date}
                  positiveRating={positiveRating}
                  goToPageTwo={goToPageTwo}
                  boxState={boxId}
                />
              ))}
            </BoxesContainer>
          ) : (
            <NegativeFeedbackContainer
              boxDate={negativeFeedback.boxDate}
              boxId={boxId}
              token={token}
            />
          )}
        </Container>
      </FeedbackPage>
      <BackButton loading={loading ? 1 : 0} />
      <Logout loading={loading ? 1 : 0} />
    </>
  );
}

export default Feedback;

const FeedbackPage = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background-color: #6d7ce4;
`;

const Top = styled.div`
  width: 100%;
  height: 30vw;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 30px;
`;

const Title = styled.p`
  font-size: 6vw;
  font-weight: 500;
  text-align: center;
  padding: 0px 5%;
`;

const Container = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 0px 0px;
  padding: 0px;
  background-color: #ffffff;
`;

const Image = styled.img`
  width: 80%;
  margin: 0px;
  border-radius: 50px;
`;

const BoxesContainer = styled.div`
  width: 100%;
  padding: 0px 5% 0px 5%;
  font-size: 20px;
  color: #8c97ea;
  text-align: center;
  overflow: auto;
`;
