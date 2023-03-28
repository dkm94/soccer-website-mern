import axios from 'axios';
const CORS = 'https://mycorsproxy-dkm.herokuapp.com';
const BASE_URL = 'https://soccer-api-2zzl.onrender.com';
const token = localStorage.getItem('token');
const authorization = { Authorization: `Bearer ${token}` };

const getUsers = async () => {
  const url = `${BASE_URL}/admin/users/`;
  const config = {
    method: 'get',
    url,
    headers: authorization
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log('Error', error);
      // Request made and server responded
      console.log(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
  }
};

const changeModStatus = async ({ _id }) => {
  const url = `${BASE_URL}/admin/mods/mod/${_id}`;
  const config = {
    method: 'put',
    url,
    headers: authorization
  };
  return await axios(config);
};

export { getUsers, changeModStatus };