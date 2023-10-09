const path = require('path');
const express = require('express');

const { exchangeAuthCodeForToken } = require('./httpRequest');
const {
  HTTP_PORT,
  API_BASE_URL,
  AUTH_ENABLED,
  UI_OIDC_LOGIN_REDIRECT_URL,
  OIDC_CLIENT_ID,
  MCM_COOKIE_NAME
} = require('./config');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/config', (req, res) => {
  const config = {
    API_BASE_URL,
    AUTH_ENABLED,
    UI_OIDC_LOGIN_REDIRECT_URL,
    OIDC_CLIENT_ID,
    MCM_COOKIE_NAME,
  };
  console.log('connection-manager-ui server: /config called, returning: ', config);
  res.send(config);
});

app.get('/oidc-token', async (req, res) => {
  const { code } = req.query;
  const response = await exchangeAuthCodeForToken(code);
  console.log('oidc response:', response);

  res
    .status(response.access_token ? 200 : 401)
    .json(response);
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(HTTP_PORT, () => { console.log(`Server is running on port ${HTTP_PORT}...`); });
