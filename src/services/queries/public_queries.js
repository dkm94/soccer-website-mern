import axios from "axios";
const CORS = "https://mycorsproxy-dkm.herokuapp.com";
const BASE_URL = "https://soccer-api-2zzl.onrender.com";
const prefix = "public/articles";

const getProfiles = async () => {
  const { data } = await axios.get(`${BASE_URL}/public/profiles/`);
  return data;
}

const getProfile = async (id) => {
  const profileId = id.queryKey[1];
  const { data } = await axios.get(`${BASE_URL}/public/profiles/${profileId}`);
  return data;
}

const getArticles = async () => {
  const { data } = await axios.get(`${BASE_URL}/${prefix}/`);
  return data;
}

const getArticlesByAuthor = async (params) => {
  const profileId = params?.queryKey[1];
  const { data } = await axios.get(`${BASE_URL}/${prefix}/author/${profileId}`);
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

export {getProfiles, getProfile, getArticles, getArticlesByAuthor, getArticle, getCommentsByArticle, getComment};
