import axios from 'axios';
// const CORS = 'https://mycorsproxy-dkm.herokuapp.com';
const BASE_URL = 'https://soccer-api-2zzl.onrender.com';
// const BASE_URL = 'http://localhost:3001';
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

const createPost = async ({ online, title, topic, summary, file, caption, content }) => {
  // faire les checks à la main ou avec YUP
  // le non respect des limites de caractères cause l'erreur 502 Bad Gateway
  try {
    const url = `${BASE_URL}/mod/articles/create`;
    const form = new FormData();
    form.set('online', online);
    form.set('title', title);
    form.set('topic', topic);
    form.set('summary', summary);
    if (file) {
      form.set('file', file?.[0]);
    }
    form.set('caption', caption);
    form.set('content', content);
    const customHeaders = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    };
    const { data } = await axios.post(url, form, { headers: customHeaders });
    return data;
  } catch (err) {
    console.log('🚀 ~ file: mods_queries.js:56 ~ createPost ~ err:', err);
    throw err;
  }
};

const editPost = async ({ _id, online, title, topic, summary, file, caption, content }) => {
  try {
    const url = `${BASE_URL}/mod/articles/edit/${_id}`;
    const form = new FormData();
    form.set('title', title);
    form.set('topic', topic);
    form.set('summary', summary);
    form.set('caption', caption);
    form.set('content', content);
    form.set('online', online);
    if (file?.[0]) {
      form.set('file', file?.[0]);
    }

    const customHeaders = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    };

    const { data } = await axios.put(url, form, { headers: customHeaders });
    return data;
  } catch (e) {
    // console.log('🚀 ~ file: mods_queries.js:72 ~ editPost ~ e:', e);
    throw new Error(e.response.data.error);
  }
};

const deletePost = async (_id) => {
  console.log('🚀 ~ file: mods_queries.js:88 ~ deletePost ~ _id:', _id);
  const url = `${BASE_URL}/mod/articles/delete/${_id}`;
  const customHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  };
  try {
    const { data } = await axios.delete(url, { headers: customHeaders });
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export { createPost, editPost, deletePost };
