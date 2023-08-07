import axios from 'axios';
import { RECREATIONAPI } from '../config/api';

const recreationAPI = {
  list: async () => {
    const res = await axios.get(RECREATIONAPI.LIST);

    return res.data;
  },

  create: async (payload) => {
    const res = await axios.post(RECREATIONAPI.CREATE, payload);

    return res.data;
  },
};

export default recreationAPI;
