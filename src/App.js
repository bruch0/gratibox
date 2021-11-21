/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './shared/GlobalStyles';

import Home from './pages/public/Home';
import SignUp from './pages/public/SignUp';
import SignIn from './pages/public/SignIn';
import UserSubscription from './pages/private/UserSubscription';
import Subscribe from './pages/private/Subscribe';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/subscription" element={<UserSubscription />} />
        <Route path="/subscribe" element={<Subscribe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
