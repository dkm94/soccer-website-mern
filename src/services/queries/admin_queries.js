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

const createMod = async (form) => {
  try {
    const url = `${BASE_URL}/admin/mods`;
    const { data } = await axios.post(url, form, {
      signal: new AbortController().signal,
      headers: authorization
    });
    return data;
  } catch (error) {
    if (error) throw error;
  }
};

const deleteMods = async (ids) => {
  try {
    const url = `${BASE_URL}/admin/mods/delete`;
    const { data } = await axios.post(url, ids, {
      signal: new AbortController().signal,
      headers: authorization
    });
    return data;
  } catch (error) {
    if (error) throw error;
  }
};

export { changeModStatus, createMod, deleteMods };
