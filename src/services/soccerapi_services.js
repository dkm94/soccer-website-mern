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

async function getMatches(name, from, to) {
  console.log('🚀 ~ file: soccerapi_services.js:53 ~ getMatches ~ to:', to);
  console.log('🚀 ~ file: soccerapi_services.js:53 ~ getMatches ~ from:', from);
  console.log('🚀 ~ file: soccerapi_services.js:53 ~ getMatches ~ name:', name);
  const url = `${corsEveryhere}/${BASE_URL}/${apiVersion}/${name}/`;
  const config = {
    method: 'get',
    url,
    headers: { 'X-Auth-Token': `${tokenAPI}` },
    params: {
      dateFrom: from,
      dateTo: to
    }
  };
  const { data } = await axios(config);
  return data[`${name}`];
}

function getScoreBoard(name, code) {
  const url = `${corsEveryhere}/${BASE_URL}/${apiVersion}/${name}/${code}/matches`;
  return axios
    .get(url, { headers: { 'X-Auth-Token': `${tokenAPI}` } })
    .then((response) => response.data)
    .catch((error) => console.log('Error', error));
}
