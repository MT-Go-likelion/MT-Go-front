import axios from 'axios';
import { SHOPPINGAPI } from '../config/api';

const shoppingAPI = {
  create: async (payload, token) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.post(SHOPPINGAPI.CREATE, payload, headers);

    return res.data;
  },

  list: async (token) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.get(`${SHOPPINGAPI.LIST}`, headers);

    return res.data;
  },
};

export default shoppingAPI;
