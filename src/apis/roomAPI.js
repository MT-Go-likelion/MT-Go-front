import axios from 'axios';
import { ROOMAPI } from '../config/api';

const roomAPI = {
  list: async () => {
    const res = await axios.get(ROOMAPI.MAINLIST);

    return res.data;
  },
  scrap: async ({ isScrap, lodging, token }) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.post(ROOMAPI.SCRAP, { isScrap, lodging }, headers);

    return res.data;
  },
  create: async (payload) => {
    const res = await axios.post(ROOMAPI.CREATEROOM, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  },
};

export default roomAPI;
