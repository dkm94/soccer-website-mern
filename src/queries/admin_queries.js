import axios from "axios";
const CORS = "https://mycorsproxy-dkm.herokuapp.com";
const BASE_URL = "https://soccer-api-2zzl.onrender.com";
const prefix = "admin/mods";
const token = localStorage.getItem("token");
const authorization = { "Authorization": `Bearer ${token}`};

const getMods = () => {
  const url = `${BASE_URL}/${prefix}/`;
  const config = {
    method: 'get',
    url,
    headers: authorization
  };
  return axios(config)
              .then((response) => {
                console.log(response.data);
                return response.data
            })
              .catch((error) => {
                if (error.response) {
                  console.log("Error", error)
                  // Request made and server responded
                  console.log(error.response.data);
                } else if (error.request) {
                  // The request was made but no response was received
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
              });
}

const getMod = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/${prefix}/${id}`);
    return data;
  }

export {getMod};
