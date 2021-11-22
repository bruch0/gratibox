/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import React from 'react';
import styled from 'styled-components';
import like from '../assets/ratings/like.png';
import dislike from '../assets/ratings/dislike.png';
import { ReactComponent as LoadingIcon } from '../assets/loading/loading.svg';

function FeedbackBox({
  boxId,
  loading,
  boxDate,
  positiveRating,
  goToPageTwo,
  boxState,
}) {
  return (
    <FeedbackBoxContainer loading={loading ? 1 : 0}>
      Box: {boxDate}
      <ActionHolder>
        <Action onClick={() => positiveRating(boxId)}>
          {loading && boxState === boxId ? (
            <LoadingIcon />
          ) : (
            <Icon src={like} />
          )}
        </Action>
        <Action onClick={() => goToPageTwo(boxId, boxDate)}>
          <Icon src={dislike} />
        </Action>
      </ActionHolder>
    </FeedbackBoxContainer>
  );
}

export default FeedbackBox;

const FeedbackBoxContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  color: #8c97ea;
  margin-bottom: 15px;
  pointer-events: ${(props) => (props.loading ? 'none' : 'all')};
`;

const ActionHolder = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
`;

const Action = styled.button`
  width: 47px;
  height: 47px;
  padding: 0px;
  margin: 0px;
  border-radius: 5px;
  border: none;
  font-size: 4vw;
  font-weight: 700;
  color: white;
  text-align: center;
  background-color: #e0d1ed;
`;

const Icon = styled.img`
  width: 60%;
  height: 60%;
`;
