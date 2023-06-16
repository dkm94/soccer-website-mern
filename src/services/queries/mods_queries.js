import axios from 'axios';
// const CORS = 'https://mycorsproxy-dkm.herokuapp.com';
const BASE_URL = 'https://soccer-api-2zzl.onrender.com';
const token = localStorage.getItem('token');

// const authorization = { Authorization: `Bearer ${token}` };

// const getReportedComments = () => {
//   const url = `${BASE_URL}/mod/comments/reported/`;
//   const config = {
//     method: 'get',
//     url,
//     headers: authorization
//   };
//   return axios(config)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       if (error.response) {
//         console.log('Error', error);
//         // Request made and server responded
//         console.log(error.response.data);
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.log(error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log('Error', error.message);
//       }
//     });
// };

const createPost = async (form) => {
  try {
    const url = `${BASE_URL}/mod/articles/create`;
    const customHeaders = {
      Authorization: `Bearer ${token}`
    };
    const { data } = await axios.post(url, form, {
      headers: customHeaders,
      signal: new AbortController().signal
    });
    return data;
  } catch (err) {
    if (err) throw err;
  }
};

const editPost = async (form) => {
  try {
    const { _id } = form;
    const url = `${BASE_URL}/mod/articles/edit/${_id}`;
    const customHeaders = {
      Authorization: `Bearer ${token}`
    };

    const { data } = await axios.put(url, form, {
      headers: customHeaders,
      signal: new AbortController().signal
    });
    return data;
  } catch (err) {
    if (err) throw err;
  }
};

const deletePost = async (_id) => {
  const url = `${BASE_URL}/mod/articles/delete/${_id}`;
  const customHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  };
  try {
    const { data } = await axios.delete(url, { headers: customHeaders });
    return data;
  } catch (err) {
    if (err) throw err;
  }
};

export { createPost, editPost, deletePost };
