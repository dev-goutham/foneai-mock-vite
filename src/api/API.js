import axios from 'axios';

const API = axios.create({
  baseURL:
    // 'https://4cwq2cop7flhhn47gbgpqlequm0vljkp.lambda-url.us-east-1.on.aws',
    'http://localhost:4000',
});

API.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'foneaiJwtToken'
    )}`;
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => Promise.reject(error)
);

export default API;
