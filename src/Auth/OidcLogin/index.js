const OidcLogin = (envConfig) => {
  const { UI_OIDC_LOGIN_REDIRECT_URL, OIDC_CLIENT_ID } = envConfig;
  window.location.href = `${UI_OIDC_LOGIN_REDIRECT_URL}?client_id=${OIDC_CLIENT_ID}&response_type=code`;
  return null;
}

export default OidcLogin;
