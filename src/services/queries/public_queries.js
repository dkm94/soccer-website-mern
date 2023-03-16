import axios from "axios";
const CORS = "https://mycorsproxy-dkm.herokuapp.com";
const BASE_URL = "https://soccer-api-2zzl.onrender.com";
const prefix = "public/articles";

const getArticles = async () => {
  const { data } = await axios.get(`${BASE_URL}/${prefix}/`);
  return data;
}

const getArticlesByAuthor = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/${prefix}/author/${id}`);
  return data;
}

const getArticle = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/${prefix}/${id}`);
  return data;
}

const getCommentsByArticle = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/${prefix}/comments/${id}`);
  return data;
}

const getComment = async (id) => {
  const { data } = await axios.get(`public/comments/${id}`);
  return data;
}

export {getArticles, getArticlesByAuthor, getArticle, getCommentsByArticle, getComment};
