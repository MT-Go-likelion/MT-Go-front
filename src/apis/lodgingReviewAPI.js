import axios from 'axios';
import { LODGINGAPI } from '../config/api';

const lodgingReviewAPI = {
  create: async (payload, token) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.post(LODGINGAPI.CREATEREVIEW, payload, headers);

    return res.data;
  },

  list: async (id, page) => {
    const res = await axios.get(`${LODGINGAPI.DETAIL}${id}/review/`, {
      params: { page },
    });

    return res.data;
  },

  delete: async (id, token) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.delete(LODGINGAPI.DELETEREVIEW + id, headers);

    return res.data;
  },
};

export default lodgingReviewAPI;
