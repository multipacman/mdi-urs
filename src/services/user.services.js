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

const userService = {
  getUserDetails,
};

export default userService;
