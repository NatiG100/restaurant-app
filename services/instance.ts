import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://192.168.1.11:4000/api/',
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