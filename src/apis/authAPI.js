import axios from 'axios';
import { baseURL } from '../constants/url';

const authAPI = {
  signUp: async (payload) => {
    const res = await axios.post(`${baseURL}/accounts/user/signup/`, payload);
    return res.data;
  },
  signIn: async (payload) => {
    const res = await axios.post(`${baseURL}/accounts/user/signin/`, payload);
    return res.data;
  },
};

export default authAPI;
