import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import image from '../../assets/images/image05.webp';

function Home() {
  return (
    <Homepage>
      <Top></Top>
      <Image src={image} />
      <Bottom></Bottom>
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
  background-color: #6d7ce4;
`;

const Image = styled.img`
  width: 100%;
`;

const Bottom = styled.div`
  width: 100%;
  height: 25%;
  background-color: #4d65a8;
`;
