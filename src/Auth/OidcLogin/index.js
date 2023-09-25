const OidcLogin = (envConfig) => {
  const { UI_OIDC_LOGIN_REDIRECT_URL, MCM_CLIENT_ID } = envConfig;
  window.location.href = `${UI_OIDC_LOGIN_REDIRECT_URL}?client_id=${MCM_CLIENT_ID}&response_type=code`;
  return null;
}

export default OidcLogin;
