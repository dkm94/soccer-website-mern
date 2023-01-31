import axios from 'axios';

const BASE_URL = 'http://api.football-data.org/v2';
const headersId = "9a56582ee8c04485a073a7ae417482f8";
const corsEveryhere = "https://cors-anywhere.herokuapp.com";

export {BASE_URL, getRessources, getRessource, getMatches, getCount};

function getRessources(name) {
  const url = `${corsEveryhere}/${BASE_URL}/${name}`;
  var config = {
    method: 'get',
    url,
    headers: { "X-Auth-Token": `${headersId}`}
  };
  return axios(config)
              .then((response) => response.data[`${name}`])
              .catch((error) => {
                if (error.response) {
                  console.log("ERRORRRRRRRRRRRRRR", error)
                  // Request made and server responded
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
              });
}
function getCount(name) {
  const url = `${corsEveryhere}/${BASE_URL}/${name}`;
  return axios.get(url, { headers: { "X-Auth-Token": `${headersId}` }}).then((response) => response.data.count);
}
function getRessource(name, id) {
  const url = `${corsEveryhere}/${BASE_URL}/${name}/${id}`;
  return axios.get(url, { headers: { "X-Auth-Token": `${headersId}` }}).then((response) => response.data);
}

function getMatches(name, from, to) {
  const url = `${corsEveryhere}/${BASE_URL}/${name}`;
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


