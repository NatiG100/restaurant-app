import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:4000/api/',
    timeout: 10000,
});
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    return {message:"Client Error"};
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    return response?.data;
    }, function (error) {
    return error?.response?.data
});
export default instance;