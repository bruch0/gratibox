const storeToken = (token) => {
  localStorage.setItem('token', token);
};

const getToken = () => localStorage.getItem('token');

export { storeToken, getToken };
