import axios from 'axios';
import { LODGINGAPI } from '../config/api';

const lodgingAPI = {
  list: async (token, page, searchQuery) => {
    const res = await axios.get(LODGINGAPI.LIST, {
      headers: token ? { Authorization: `Token ${token}` } : {},
      params: { page, ...searchQuery },
    });

    return res.data;
  },

  mainList: async () => {
    const res = await axios.get(LODGINGAPI.MAINLIST);

    return res.data;
  },

  scrap: async ({ isScrap, lodging, token }) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.post(LODGINGAPI.SCRAP, { isScrap, lodging }, headers);

    return res.data;
  },
  create: async (payload) => {
    const res = await axios.post(LODGINGAPI.CREATE, payload);

    return res.data;
  },

  update: async (payload, id) => {
    const res = await axios.put(`${LODGINGAPI.DETAIL + id}/`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  },

  delete: async (id) => {
    const res = await axios.delete(LODGINGAPI.DETAIL + id);

    return res.data;
  },

  detail: async (id, token) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.get(LODGINGAPI.DETAIL + id, headers);

    return res.data;
  },

  scrapList: async (token) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.get(LODGINGAPI.SCRAPLIST, headers);

    return res.data;
  },
};

export default lodgingAPI;
