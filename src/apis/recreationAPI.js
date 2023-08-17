import axios from 'axios';
import { RECREATIONAPI } from '../config/api';

const recreationAPI = {
  list: async (token, page) => {
    const res = await axios.get(RECREATIONAPI.LIST, {
      headers: token ? { Authorization: `Token ${token}` } : {},
      params: { page },
    });

    return res.data;
  },

  mainList: async (token) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.get(RECREATIONAPI.MAINLIST, headers);

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

  update: async (payload, id) => {
    const res = await axios.put(`${RECREATIONAPI.DETAIL + id}/`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  },

  delete: async (id) => {
    const res = await axios.delete(RECREATIONAPI.DETAIL + id);

    return res.data;
  },

  detail: async (id, token) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.get(RECREATIONAPI.DETAIL + id, headers);

    return res.data;
  },

  scrapList: async (token) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.get(RECREATIONAPI.SCRAPLIST, headers);

    return res.data;
  },
};

export default recreationAPI;
