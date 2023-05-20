/* eslint-disable no-undef */
import axios from 'axios';
const tokenAPI = process.env.REACT_APP_API_FOOTBALL_TOKEN;

const app = axios.create({
  baseURL: 'https://api.football-data.org',
  url: '/v4/matches',
  method: 'get',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Content-Type': 'application/json',
    'X-Auth-Token': `${tokenAPI}`
  },
  withCredentials: true
});

export default app;
