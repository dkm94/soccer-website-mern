import axios from "axios";
const CORS = "https://mycorsproxy-dkm.herokuapp.com";
const BASE_URL = "https://soccer-api-2zzl.onrender.com";

const login = async (data) => {
  const url = `${BASE_URL}/auth/login`;
  try {
    await axios.post(url, data).then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("profileId", res.data.profileId);
      localStorage.setItem("isAdmin", res.data.isAdmin);
      localStorage.setItem("isMod", res.data.isMod);
      localStorage.setItem("userId", res.data.isMod);
      localStorage.setItem("accountValidated", res.data.accountValidated);

      const token = localStorage.getItem("token");
      if (token) {
        setTimeout(() => {
          window.location = "/backoffice";
        }, 500);
      }
    });
  } catch (e) {
    console.error(`Error: ${e.response.data.error}`);
  }
};

export { login };
