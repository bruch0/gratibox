/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiSquare, FiCheckSquare } from 'react-icons/fi';
import { throwError, throwSuccess } from '../shared/ThrowMessages';
import { registerFeedback } from '../services/api';

function NegativeFeedbackContainer({ boxDate, boxId, token }) {
  const [comment, setComment] = useState('');
  const [selectedChecks, setSelectedChecks] = useState([]);
  const navigate = useNavigate();

  const removeCheck = (number) => {
    const index = selectedChecks.indexOf(number);
    selectedChecks.splice(index, 1);
    setSelectedChecks([...selectedChecks]);
  };

  const handleSubmit = () => {
    if (!selectedChecks.length) {
      throwError('Escolha uma das opções');
    } else if (!comment) {
      throwError(
        'Insira um comentário, queremos saber como melhorar sua experiência'
      );
    } else if (comment.length < 8) {
      throwError('Seja generoso, insira ao menos 8 caractéres');
    } else if (comment.length > 220) {
      throwError('Seja modesto, insira até 220 caractéres');
    } else {
      const aux1 = selectedChecks.indexOf(1) !== -1 ? 'Entrega atrasada' : '';
      const aux2 =
        selectedChecks.indexOf(2) !== -1 ? 'Não gostei do que recebi' : '';
      const finalComment = `${aux1} ${aux2} ${comment}`;

      registerFeedback(boxId, 2, token, finalComment).then(() => {
        throwSuccess('Feedback registrado!');
        navigate('/subscription-details');
      });
    }
  };

  return (
    <NegativeFeedbackHolder>
      Box: {boxDate}
      <CommentContainer>
        <Options>
          <Option
            onClick={() =>
              selectedChecks.indexOf(1) === -1
                ? setSelectedChecks([...selectedChecks, 1])
                : removeCheck(1)
            }
          >
            {selectedChecks.indexOf(1) === -1 ? (
              <FiSquare />
            ) : (
              <FiCheckSquare />
            )}
            Entrega
            <br />
            atrasada
          </Option>
          <Option
            onClick={() =>
              selectedChecks.indexOf(2) === -1
                ? setSelectedChecks([...selectedChecks, 2])
                : removeCheck(2)
            }
          >
            {selectedChecks.indexOf(2) === -1 ? (
              <FiSquare />
            ) : (
              <FiCheckSquare />
            )}
            Não gostei do
            <br />
            que recebi
          </Option>
        </Options>
        <CommentArea
          placeholder="Comentários"
          value={comment
            .replace('Não gostei do que recebi', '')
            .replace('Entrega atrasada', '')}
          onChange={(e) => setComment(e.target.value)}
        />
      </CommentContainer>
      <SendFeedback onClick={handleSubmit}>Avaliar</SendFeedback>
    </NegativeFeedbackHolder>
  );
}

export default NegativeFeedbackContainer;

const NegativeFeedbackHolder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: #8c97ea;
  font-size: 7vw;
  text-align: center;
`;

const CommentContainer = styled.div`
  width: 100%;
  height: 30vh;
  margin: 15px 0px;
  font-size: 18px;
`;

const SendFeedback = styled.button`
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

const Options = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 15px;
`;

const Option = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #4d65a8;

  svg {
    color: #e0d1ed;
  }
`;

const CommentArea = styled.textarea`
  width: 95%;
  height: 70%;
  border: 0px;
  padding: 5px;
  border-radius: 5px;
  background-color: #e0d1ed;
  color: #4d65a8;
  font-size: 18px;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  resize: none;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: #4d65a8;
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: #4d65a8;
  }

  ::-ms-input-placeholder {
    color: #4d65a8;
  }
`;
