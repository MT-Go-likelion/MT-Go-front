export const BASE_URL = 'http://54.180.98.209:8000';

export const AUTHAPI = {
  SIGNUP: `${BASE_URL}/accounts/user/signup/`,
  SIGNIN: `${BASE_URL}/accounts/user/signin/`,
};

export const LODGINGAPI = {
  MAINLIST: `${BASE_URL}/lodging/main/`,
  SCRAP: `${BASE_URL}/lodging/scrap/`,
  CREATELODGING: `${BASE_URL}/lodging/create/`,
  DETAIL: `${BASE_URL}/lodging/detail/`,
  CREATEREVIEW: `${BASE_URL}/lodging/createReview/`,
};

export const RECREATIONAPI = {
  CREATE: `${BASE_URL}/recreation/create/`,
  LIST: `${BASE_URL}/recreation/main/`,
  SCRAP: `${BASE_URL}/recreation/scrap/`,
  DETAIL: `${BASE_URL}/recreation/detail/`,
};

export const SHOPPINGAPI = {
  CREATE: `${BASE_URL}/shopping/create/`,
};
