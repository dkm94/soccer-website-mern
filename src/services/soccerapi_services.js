import axios from 'axios';

const apiVersion = 'v4';
const BASE_URL = 'http://api.football-data.org/';
// eslint-disable-next-line no-undef
const tokenAPI = process.env.REACT_APP_API_FOOTBALL_TOKEN;
const corsEveryhere = 'https://mycorsproxy-dkm.herokuapp.com';

export {
  BASE_URL,
  getRessources,
  getRessource,
  getMatches,
  getCount,
  getMatchesByCompetition,
  getScoreBoard
};

async function getRessources(name) {
  const url = `${corsEveryhere}/${BASE_URL}/${apiVersion}/${name}`;
  const config = {
    method: 'get',
    url,
    headers: { 'X-Auth-Token': `${tokenAPI}` }
  };
  const { data } = await axios(config);
  return data[`${name}`];
}

function getCount(name) {
  const url = `${corsEveryhere}/${BASE_URL}/${name}`;
  return axios
    .get(url, { headers: { 'X-Auth-Token': `${tokenAPI}` } })
    .then((response) => response.data.count);
}

function getRessource(name, id) {
  const url = `${corsEveryhere}/${BASE_URL}/${name}/${id}`;
  return axios
    .get(url, { headers: { 'X-Auth-Token': `${tokenAPI}` } })
    .then((response) => response.data);
}

function getMatchesByCompetition(name, id) {
  const url = `${corsEveryhere}/${BASE_URL}/${apiVersion}/${name}/${id}/teams`;
  return axios
    .get(url, { headers: { 'X-Auth-Token': `${tokenAPI}` } })
    .then((response) => response.data)
    .catch((error) => console.log('Error', error));
}

function getMatches(name, from, to) {
  const url = `${corsEveryhere}/${BASE_URL}/${name}`;
  return axios
    .get(url, {
      headers: { 'X-Auth-Token': `${tokenAPI}` },
      params: {
        dateFrom: from,
        dateTo: to
      }
    })
    .then((response) => response.data[`${name}`])
    .catch((error) => console.log('Error', error));
}

function getScoreBoard(name, code) {
  const url = `${corsEveryhere}/${BASE_URL}/${apiVersion}/${name}/${code}/matches`;
  return axios
    .get(url, { headers: { 'X-Auth-Token': `${tokenAPI}` } })
    .then((response) => response.data)
    .catch((error) => console.log('Error', error));
}
