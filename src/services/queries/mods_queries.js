import axios from 'axios';
// const CORS = 'https://mycorsproxy-dkm.herokuapp.com';
const BASE_URL = 'https://soccer-api-2zzl.onrender.com';
// const BASE_URL = 'http://localhost:3001';
const token = localStorage.getItem('token');
const authorization = { Authorization: `Bearer ${token}` };

const getReportedComments = () => {
  const url = `${BASE_URL}/mod/comments/reported/`;
  const config = {
    method: 'get',
    url,
    headers: authorization
  };
  return axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
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
    });
};

const createPost = async ({ title, summary, file, caption, content }) => {
  const url = `${BASE_URL}/mod/articles/create`;
  const form = new FormData();
  form.set('title', title);
  form.set('summary', summary);
  form.set('file', file);
  form.set('caption', caption);
  form.set('content', content);
  const customHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  };
  try {
    const { data } = await axios.post(url, form, { headers: customHeaders });
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export { getReportedComments, createPost };
