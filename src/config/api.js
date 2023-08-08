export const BASE_URL = 'http://54.180.98.209:8000';

export const AUTHAPI = {
  SIGNUP: `${BASE_URL}/accounts/user/signup/`,
  SIGNIN: `${BASE_URL}/accounts/user/signin/`,
};

export const LODGINGAPI = {
  LIST: `${BASE_URL}/lodging/main/`,
  SCRAP: `${BASE_URL}/lodging/scrap/`,
  CREATELODGING: `${BASE_URL}/lodging/create/`,
  DETAIL: `${BASE_URL}/lodging/detail/`,
  CREATEREVIEW: `${BASE_URL}/lodging/createReview/`,
  SCRAPLIST: `${BASE_URL}/lodging/scrapList/`,
};

export const RECREATIONAPI = {
  CREATE: `${BASE_URL}/recreation/create/`,
  LIST: `${BASE_URL}/recreation/main/`,
  SCRAP: `${BASE_URL}/recreation/scrap/`,
  DETAIL: `${BASE_URL}/recreation/detail/`,
  SCRAPLIST: `${BASE_URL}/recreation/scrapList`,
};

export const SHOPPINGAPI = {
  CREATE: `${BASE_URL}/shopping/create/`,
  LIST: `${BASE_URL}/shopping/shoppingList/`,
};
