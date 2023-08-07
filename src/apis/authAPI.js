import axios from 'axios';
import { AUTHAPI } from '../config/api';

const authAPI = {
  signUp: async (payload) => {
    const res = await axios.post(AUTHAPI.SIGNUP, payload);
    return res.data;
  },
  signIn: async (payload) => {
    const res = await axios.post(AUTHAPI.SIGNIN, payload);
    return res.data;
  },
};

export default authAPI;
