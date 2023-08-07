import axios from 'axios';
import { LODGINGAPI } from '../config/api';

const lodgingReviewAPI = {
  create: async (payload, token) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.post(LODGINGAPI.CREATEREVIEW, payload, headers);

    return res.data;
  },

  list: async (id) => {
    const res = await axios.get(`${LODGINGAPI.DETAIL}${id}/review/`);

    return res.data;
  },
};

export default lodgingReviewAPI;
