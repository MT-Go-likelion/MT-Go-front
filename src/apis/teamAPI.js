import axios from 'axios';
import { TEAMAPI } from '../config/api';

const teamAPI = {
  list: async (token) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.get(TEAMAPI.TEAM, headers);

    return res.data;
  },

  create: async (name, token) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.post(TEAMAPI.TEAM, name, headers);

    return res.data;
  },

  lodgingList: async (token) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.get(TEAMAPI.TEAMLODGING, headers);

    return res.data;
  },

  lodgingCreate: async (payload, token) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await axios.post(TEAMAPI.TEAMLODGING, payload, headers);

    return res.data;
  },
};

export default teamAPI;
