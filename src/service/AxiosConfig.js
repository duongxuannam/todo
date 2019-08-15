import axios from 'axios';
import AppConfig from '../config/AppConfig';

const api = axios.create({
  baseURL: `${AppConfig.baseURL}`,
  timeout: 30000,
});

api.interceptors.response.use((response) => {
  if (__DEV__) {
    // console.log('res ', response);
  }
  return response.data;
},
(error) => {
  if (__DEV__) {
    // console.log('error ', error);
  }
  if (error.response) {
    // if(__DEV__) {
    //   console.log('error ', error.response) 
    // }
    // console.log('error response', error.response);

    // error.response.data.errors.statusCode = error.response.status
    return Promise.reject(error.response);
  } else if (error.request) return Promise.reject({
    // common: 'No response was received' 
    data: {
      message: 'No response was received',
    },
  });
  // console.log('error response', error.message);

  return Promise.reject({ common: error.message });
});

api.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (__DEV__) {
    // console.log('config ', config);
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


export function setAuthorizationToken(token) {
  api.defaults.headers.common.Authorization = token;
}


export default api;