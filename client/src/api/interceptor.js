import axios from 'axios';
import CONTANTS from '../constants';
import history from '../browserHistory';

const httpClient = axios.create({
  baseURL: CONTANTS.BASE_URL,
});

let accessToken;

httpClient.interceptors.request.use((config) => {
  const token = window.localStorage.getItem(CONTANTS.REFRESH_TOKEN);
  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }
  return config;
}, (err) => Promise.reject(err));

httpClient.interceptors.response.use((response) => {
  if (response.data.data.refreshToken) {
    window.localStorage.setItem(CONTANTS.REFRESH_TOKEN, response.data.data.refreshToken);
  }
  return response;
}, (err) => {
  if (err.response.status === 419) {
   // todo: refresh
  }
  if (err.response.status === 401) {
   // todo: redirect user to login/signup page
  }
  return Promise.reject(err);
});

export default httpClient;
