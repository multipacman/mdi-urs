import axios from 'axios';

const API_URL = process.env.REACT_APP_WEB_API;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const userLogin = payload => {
  const login = axios.request({
    method: 'POST',
    url: `${API_URL}/oauth/token`,
    data: {
      username: payload.username,
      password: payload.password,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'password',
    },
    headers: {
      Accept: 'application/json',
    },
  });

  return login;
};

const userLogout = async accessToken => {
  return await axios.request({
    method: 'GET',
    url: `${API_URL}/api/v1/logout`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const storeUserAccessToken = (
  token_type,
  expires_in,
  access_token,
  refresh_token
) => {
  localStorage.setItem(
    'authToken',
    JSON.stringify({
      token_type: token_type,
      expires_in: expires_in,
      access_token: access_token,
      refresh_token: refresh_token,
    })
  );
};

const retrieveUserAccessToken = () => {
  return JSON.parse(localStorage.getItem('authToken'))?.access_token;
};

const isLoggedIn = () => {
  return (
    retrieveUserAccessToken() !== null &&
    retrieveUserAccessToken() !== undefined &&
    retrieveUserAccessToken() !== ''
  );
};

const authService = {
  userLogin,
  userLogout,
  storeUserAccessToken,
  retrieveUserAccessToken,
  isLoggedIn,
};

export default authService;
