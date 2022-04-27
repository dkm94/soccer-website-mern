import axios from 'axios';

const BASE_URL = 'http://api.football-data.org/v2';
const headersId = "9a56582ee8c04485a073a7ae417482f8";

export {BASE_URL, getRessources, getRessource};

function getRessources(name) {
  const url = `${BASE_URL}/${name}`;
  return axios.get(url, { headers: { "X-Auth-Token": `${headersId}` }}).then((response) => response.data[`${name}`]);
}
function getRessource(name, id) {
  const url = `${BASE_URL}/${name}/${id}`;
  return axios.get(url, { headers: { "X-Auth-Token": `${headersId}` }}).then((response) => response.data);
}


