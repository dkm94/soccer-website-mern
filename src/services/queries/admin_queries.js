import axios from 'axios';
// const CORS = 'https://mycorsproxy-dkm.herokuapp.com';
const BASE_URL = 'https://soccer-api-2zzl.onrender.com';
const token = localStorage.getItem('token');
const authorization = { Authorization: `Bearer ${token}` };

const changeModStatus = async ({ _id }) => {
  const url = `${BASE_URL}/admin/mods/mod/${_id}`;
  const config = {
    method: 'put',
    url,
    headers: authorization
  };
  return await axios(config);
};

export { changeModStatus };
