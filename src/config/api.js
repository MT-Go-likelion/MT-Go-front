import axios from 'axios';

const BASE_URL = 'http://54.180.98.209:8000';

export const API = {
  SIGNUP: `${BASE_URL}/accounts/user/signup/`,
  SIGNIN: `${BASE_URL}/accounts/user/signin/`,
};

export const TESTAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('USER')?.token}`,
  },
  withCredentials: true,
});
// 85555b4b230deb08f3eda89b5d773d902e9f488c
