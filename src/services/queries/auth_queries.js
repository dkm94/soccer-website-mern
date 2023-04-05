import axios from 'axios';
// const CORS = 'https://mycorsproxy-dkm.herokuapp.com';
const BASE_URL = 'https://soccer-api-2zzl.onrender.com';

const login = async (data) => {
  const url = `${BASE_URL}/auth/login`;
  try {
    await axios.post(url, data).then((res) => {
      const { token, auth, profileId, isAdmin, isMod, userId, accountValidated } = res.data;
      setToken(token);
      localStorage.setItem('logged_in_status', JSON.stringify(auth));
      localStorage.setItem('profileId', JSON.stringify(profileId));
      localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
      localStorage.setItem('isMod', JSON.stringify(isMod));
      localStorage.setItem('userId', JSON.stringify(userId));
      localStorage.setItem('accountValidated', JSON.stringify(accountValidated));
      return res.data;
    });
  } catch (e) {
    throw new Error(e.response.data.error);
  }

  function setToken(token) {
    localStorage.setItem('token', token);
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      throw new Error('Token not stored');
    }
  }
};

export { login };
