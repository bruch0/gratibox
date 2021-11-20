const storeUsername = (username) => {
  localStorage.setItem('username', username);
};

const getUsername = () => localStorage.getItem('username');

const removeUsername = () => localStorage.removeItem('username');

export { storeUsername, getUsername, removeUsername };
