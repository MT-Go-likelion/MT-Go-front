import axios from 'axios';
import { API } from '../config/api';

const authAPI = {
  signUp: async (payload) => {
    const res = await axios.post(API.SIGNUP, payload);
    return res.data;
  },
  signIn: async (payload) => {
    const res = await axios.post(API.SIGNIN, payload);
    return res.data;
  },
};

export default authAPI;
