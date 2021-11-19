/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './shared/GlobalStyles';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
