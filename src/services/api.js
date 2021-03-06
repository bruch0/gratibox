import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://gratibox-brucho.herokuapp.com/'
      : 'http://localhost:4000/',
});

function makeHeaders(token) {
  return {
    headers: {
      'x-access-token': token,
    },
  };
}

const signUpUser = (name, email, password) =>
  api.post('/sign-up', {
    name,
    email,
    password,
  });

const signInUser = (email, password) =>
  api.post('/sign-in', {
    email,
    password,
  });

const subscribeUser = (
  plan,
  deliveryDate,
  itemsWanted,
  zipcode,
  number,
  token
) =>
  api.post(
    '/subscribe',
    {
      plan,
      deliveryDate,
      itemsWanted,
      zipcode,
      number,
    },
    makeHeaders(token)
  );

const changeUserSubscription = (
  plan,
  deliveryDate,
  itemsWanted,
  zipcode,
  number,
  token
) =>
  api.put(
    '/subscribe',
    {
      plan,
      deliveryDate,
      itemsWanted,
      zipcode,
      number,
    },
    makeHeaders(token)
  );

const requestUserSubscription = (token) =>
  api.get('/user-subscription', makeHeaders(token));

const requestUserInfo = (token) => api.get('/user-info', makeHeaders(token));

const requestDeliveredBoxes = (token) =>
  api.get('/delivered-boxes', makeHeaders(token));

const registerFeedback = (boxId, feedbackId, token, comment) =>
  api.post(
    '/feedback',
    feedbackId === 2 ? { boxId, feedbackId, comment } : { boxId, feedbackId },
    makeHeaders(token)
  );

const requestBoxesUpdate = (token) =>
  api.get('/update-boxes', makeHeaders(token));

const persistLogin = (token) => api.post('/persist-login', { token });

export {
  api,
  signUpUser,
  signInUser,
  subscribeUser,
  changeUserSubscription,
  requestUserSubscription,
  requestUserInfo,
  requestDeliveredBoxes,
  registerFeedback,
  requestBoxesUpdate,
  persistLogin,
};
