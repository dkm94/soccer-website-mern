import axios from 'axios';
// const CORS = 'https://mycorsproxy-dkm.herokuapp.com';
const BASE_URL = 'https://soccer-api-2zzl.onrender.com';
const token = localStorage.getItem('token');

const getUser = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/common/users/${id}`);
  return data;
};

const getProfile = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/common/profiles/${id}`);
  return data;
};

const editProfile = async ({ _id, name, handle, intro, file }) => {
  try {
    const url = `${BASE_URL}/common/users/profile/edit/${_id}`;

    const form = new FormData();
    form.set('name', name);
    form.set('handle', handle);
    form.set('intro', intro);
    if (file?.[0]) {
      form.set('file', file?.[0]);
    }

    const customHeaders = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    };

    const { data } = await axios.put(url, form, { headers: customHeaders });
    return data;
  } catch (err) {
    if (err) throw err;
  }
};

export { getUser, getProfile, editProfile };
