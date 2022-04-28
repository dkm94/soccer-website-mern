import axios from 'axios';

const BASE_URL = 'http://api.football-data.org/v2';
const headersId = "9a56582ee8c04485a073a7ae417482f8";

export {BASE_URL, getRessources, getRessource, getMatches, getCount};

function getRessources(name) {
  const url = `${BASE_URL}/${name}`;
  return axios.get(url, { headers: { "X-Auth-Token": `${headersId}` }}).then((response) => response.data[`${name}`]);
}
function getCount(name) {
  const url = `${BASE_URL}/${name}`;
  return axios.get(url, { headers: { "X-Auth-Token": `${headersId}` }}).then((response) => response.data.count);
}
function getRessource(name, id) {
  const url = `${BASE_URL}/${name}/${id}`;
  return axios.get(url, { headers: { "X-Auth-Token": `${headersId}` }}).then((response) => response.data);
}

function getMatches(name, from, to) {
  const url = `${BASE_URL}/${name}`;
  return axios
        .get(url, 
          { 
            headers: { "X-Auth-Token": `${headersId}` }, 
            params: {
              dateFrom : from, 
              dateTo : to
            }
          }).then((response) => response.data[`${name}`]);
}


