import axios from 'axios';
import { LODGINGAPI } from '../config/api';

const lodgingAPI = {
  list: async (token) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.get(LODGINGAPI.MAINLIST, headers);

    return res.data;
  },
  scrap: async ({ isScrap, lodging, token }) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.post(LODGINGAPI.SCRAP, { isScrap, lodging }, headers);

    return res.data;
  },
  create: async (payload) => {
    const res = await axios.post(LODGINGAPI.CREATELODGING, payload);

    return res.data;
  },

  detail: async (id) => {
    const res = await axios.get(LODGINGAPI.DETAIL + id);
    return res.data;
  },
};

export default lodgingAPI;
