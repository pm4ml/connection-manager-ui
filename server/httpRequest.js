const querystring = require('querystring');
const axios = require('axios').default;
const config = require('./config');

const makeOidcPayload = (code) => querystring.stringify({
  code,
  client_id: config.OIDC_CLIENT_ID,
  client_secret: config.OIDC_CLIENT_SECRET,
  grant_type: 'authorization_code',
});

const requestOptions = {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
};

const exchangeAuthCodeForToken = async (code) => {
  const url = config.OIDC_TOKEN_PROVIDER_URL;
  const payload = makeOidcPayload(code);

  return axios.post(url, payload, requestOptions)
    .then((response) => {
      const { access_token, expires_in } = response.data; // expires_in in sec
      return { access_token, expires_in };
    })
    .catch((err) => {
      const error = `exchange authCode error: ${err.message} - ${JSON.stringify(err.response && err.response.data)}`;
      console.error(error, code);
      return { error };
    });
}

module.exports = {
  exchangeAuthCodeForToken,
};
