const storeToken = (token) => {
  localStorage.setItem('token', token);
};

const getToken = () => localStorage.getItem('token');

const removeToken = () => localStorage.removeItem('token');

export { storeToken, getToken, removeToken };
