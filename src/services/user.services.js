import axios from 'axios';

const API_URL = process.env.REACT_APP_WEB_API;

const getUserDetails = accessToken => {
  return axios.request({
    method: 'GET',
    url: `${API_URL}/api/v1/auth/user`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const registerNewUser = async ({ payload }) => {
  return await axios.request({
    method: 'POST',
    url: `${API_URL}/api/v1/register`,
    data: payload,
    headers: {
      Accept: 'application/json',
    },
  });
};

const emailAvailabilityCheck = async email => {
  return await axios.request({
    method: 'GET',
    url: `${API_URL}/api/v1/email/check/${email}`,
    headers: {
      Accept: 'application/json',
    },
  });
};

const userService = {
  getUserDetails,
  registerNewUser,
  emailAvailabilityCheck,
};

export default userService;
