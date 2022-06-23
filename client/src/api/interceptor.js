import axios from 'axios';
import CONSTANTS from '../constants';
import history from '../browserHistory';

const httpClient = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});

let accessToken;

httpClient.interceptors.request.use((config) => {

  if (accessToken) {
    config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
  }
  return config;
}, (err) => Promise.reject(err));

httpClient.interceptors.response.use((response) => {
  if (response.data.data.refreshToken) {
    window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, response.data.data.refreshToken);
  }
  return response;
}, (err) => {
  if (err.response.status === 419) {
  const refreshToken = window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN);
  const {data: {data: {tokenPair: {access, refresh}}}} = httpClient.post('/auth/refresh', {refreshToken});
  window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refresh);
  accessToken = access;
  err.config.headers.Authorization = `Bearer ${access}`;
  return axios.request(err.config);
  }
  if (err.response.status === 401) {
    history.replace('/login');
  }
  return Promise.reject(err);
});

export default httpClient;
