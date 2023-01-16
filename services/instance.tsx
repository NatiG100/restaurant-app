import axios from 'axios';
const instance = axios.create({
    baseURL: 'localhost:4000/api',
    timeout: 10000,
});
export default instance;