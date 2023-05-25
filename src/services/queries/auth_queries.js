import axios from 'axios';
// const CORS = 'https://mycorsproxy-dkm.herokuapp.com';
const BASE_URL = 'https://soccer-api-2zzl.onrender.com';

const login = async (form) => {
  const url = `${BASE_URL}/auth/login`;
  try {
    const { data } = await axios.post(url, form, { signal: new AbortController().signal });
    return data;
  } catch (err) {
    if (err) throw err;
  }
};

export { login };
