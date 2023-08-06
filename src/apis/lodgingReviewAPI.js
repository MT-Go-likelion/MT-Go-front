import axios from 'axios';
import { LODGINGAPI } from '../config/api';

const lodgingReviewAPI = {
  create: async (payload, token) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.post(LODGINGAPI.REVIEW, payload, headers);

    return res.data;
  },
};

export default lodgingReviewAPI;
