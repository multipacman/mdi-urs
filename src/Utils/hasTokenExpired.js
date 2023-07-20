// Token expiration time is set all the way to 1970 so every conditional check will require a new call to the refresh token. Therefore did not implement token expiration check.

export default hasTokenExpired = () => {
  if (!accessToken.access_token || !accessToken.expires_in) {
    return false;
  }

  const elapsedTime = Date.now() - Number(accessToken.expires_in);
  return elapsedTime / 1000 > Number(accessToken.expires_in);
};
