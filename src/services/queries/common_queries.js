import axios from 'axios';
// const CORS = 'https://mycorsproxy-dkm.herokuapp.com';
const BASE_URL = 'https://soccer-api-2zzl.onrender.com';
const prefix = 'common';

const getUser = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/${prefix}/users/${id}`);
  return data;
};

const getProfile = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/${prefix}/profiles/${id}`);
  return data;
};

export { getUser, getProfile };
