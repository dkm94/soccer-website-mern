import axios from 'axios';
// const CORS = 'https://mycorsproxy-dkm.herokuapp.com';
const BASE_URL = 'https://soccer-api-2zzl.onrender.com';
const token = localStorage.getItem('token');
const authorization = { Authorization: `Bearer ${token}` };

const getUser = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/common/users/${id}`, { headers: authorization });
  return data;
};

const getProfile = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/common/profiles/${id}`);
  return data;
};

const editProfile = async (form) => {
  try {
    const id = form?._id;
    const url = `${BASE_URL}/common/users/profile/edit/${id}`;
    const customHeaders = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const { data } = await axios.put(url, form, { headers: customHeaders });

    return data;
  } catch (err) {
    if (err) throw err;
  }
};

const updatePassword = async (form) => {
  try {
    const id = form?._id;
    const url = `${BASE_URL}/common/users/edit/${id}`;
    const customHeaders = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const { data } = await axios.put(url, form, { headers: customHeaders });

    return data;
  } catch (err) {
    if (err) throw err;
  }
};

export { getUser, getProfile, editProfile, updatePassword };
