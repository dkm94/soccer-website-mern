import axios from 'axios';

const BASE_URL = 'https://dummyapi.io/data/v1';
const headersId = '62694d4279fe4c43a4bc67e3';

export { BASE_URL, getRessources, getRessource };

function getRessources(name) {
  const url = `${BASE_URL}/${name}`;
  return axios
    .get(url, { headers: { 'app-id': `${headersId}` } })
    .then((response) => response.data);
}
function getRessource(name, id) {
  const url = `${BASE_URL}/${name}/${id}`;
  return axios
    .get(url, { headers: { 'app-id': `${headersId}` } })
    .then((response) => response.data);
}
