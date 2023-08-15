export const BASE_URL = 'http://mtgo.site';

export const AUTHAPI = {
  SIGNUP: `${BASE_URL}/accounts/user/signup/`,
  SIGNIN: `${BASE_URL}/accounts/user/signin/`,
  USER: `${BASE_URL}/accounts/user/`,
};

export const LODGINGAPI = {
  LIST: `${BASE_URL}/lodging/main/`,
  MAINLIST: `${BASE_URL}/lodging/mainPage/`,
  SCRAP: `${BASE_URL}/lodging/scrap/`,
  CREATE: `${BASE_URL}/lodging/create/`,
  DETAIL: `${BASE_URL}/lodging/detail/`,
  CREATEREVIEW: `${BASE_URL}/lodging/createReview/`,
  UPDATEREVIEW: `${BASE_URL}/lodging/review/`,
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

export const TEAMAPI = {
  TEAM: `${BASE_URL}/team/teamSpace/`,
  JOIN: `${BASE_URL}/team/teamSpace/join/`,
  USER: `${BASE_URL}/team/teamSpace/users/`,
  TEAMLODGING: `${BASE_URL}/team/teamSpaceLodging/`,
  LODGING_IS_SCRAP: `${BASE_URL}/team/teamSpaceLodging/scrapList/`,
  TEAMRECREATION: `${BASE_URL}/team/teamSpaceRecreation/`,
  RECREATION_IS_SCRAP: `${BASE_URL}/team/teamSpaceRecreation/scrapList/`,
  TEAMSHOPPING: `${BASE_URL}/team/teamSpaceShopping/`,
};
