import axios from 'axios';
import { RECREATIONAPI } from '../config/api';

const recreationAPI = {
  create: async (payload) => {
    const res = await axios.post(RECREATIONAPI.CREATE, payload);
    return res.data;
  },
};

export default recreationAPI;
