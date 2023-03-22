import {io} from 'socket.io-client';
import baseURL from '../constants/BASE_URL';

export const socket = io(baseURL,{withCredentials:true});