import axios from 'axios';
import baseURL from '../constants/BASE_URL';


const instance = axios.create({
    baseURL: `${baseURL}/api/`,
    timeout: 10000,
    withCredentials:true,
});
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    return Promise.reject({message:"Client Error"});
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    return response?.data;
    }, function (error) {
      return Promise.reject(error?.response?.data);
});
export default instance;