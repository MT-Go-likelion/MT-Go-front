// import axios from 'axios';

const BASE_URL = 'http://54.180.98.209:8000';

export const API = {
  SIGNUP: `${BASE_URL}/accounts/user/signup/`,
  SIGNIN: `${BASE_URL}/accounts/user/signin/`,
};

export const RoomAPI = {
  MAINLIST: `${BASE_URL}/lodging/main/`,
  SCRAP: `${BASE_URL}/lodging/scrap/`,
  CREATEROOM: `${BASE_URL}/lodging/create/`,
  BASE_URL: `${BASE_URL}`,
};
