import axios from 'axios';
import { RECREATIONAPI } from '../config/api';

const recreationAPI = {
  list: async (token) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.get(RECREATIONAPI.LIST, headers);

    return res.data;
  },

  create: async (payload) => {
    const res = await axios.post(RECREATIONAPI.CREATE, payload);

    return res.data;
  },

  scrap: async ({ isScrap, recreationPk, token }) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.post(RECREATIONAPI.SCRAP, { isScrap, recreationPk }, headers);

    return res.data;
  },
};

export default recreationAPI;
