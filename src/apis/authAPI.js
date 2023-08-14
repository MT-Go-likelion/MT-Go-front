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

  user: async (id, token) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.get(`${AUTHAPI.USER + id}/`, headers);

    return res.data;
  },

  update: async (name, id) => {
    const res = await axios.patch(`${AUTHAPI.USER + id}/`, { name });

    return res.data;
  },
};

export default authAPI;
