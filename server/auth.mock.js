const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const otplib = require('otplib');

const enabled2fa = true;
const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD';
let enrolled = false;
let first_login = true;
let expectedPassword = 'pass';
const expectedUsername = 'test';
let response;

const RESPONSES = {
  'totp_not_enabled': {
    status: 200,
    data: {
      "sharedSecret": secret,
      "issuer": "MCM",
      "label": "devMCM",
      "enrolled": false,
      "2faEnabled": true
    }
  },
  'totp_enabled': { 
    status: 200,
    data: {
      "enrolled": true,
      "2faEnabled": true
    },
  },
  'not_authenticated': {
    status: 401,
    data: {
      message: 'Not authenticated'
    }
  },
  'auth_successful': {
    status: 200,
    data: {
      token: {
        payload: 'test'
      }
    }
  },
  'first_login': {
    status: 200,
    data: {
      askPassword: true,
      userguid: '123123',
    }
  },
  'password_reset_successful': {
    status: 204,
  },
};

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/login', function (req, res) {

  const { username, password } = req.body;
  const isValid = username === expectedUsername && password === expectedPassword;

  if (isValid && first_login) {
    response = RESPONSES.first_login;
  } else if (isValid && !enabled2fa) {
    response = RESPONSES.auth_successful;
  } else if (isValid && enrolled) {
    response = RESPONSES.totp_enabled;
  } else if (isValid && !enrolled) {
    response = RESPONSES.totp_not_enabled;
  } else {
    response = RESPONSES.not_authenticated;
  }
  res.status(response.status);
  res.json(response.data);
});


app.post('/resetPassword', function(req, res) {
  const { username, newPassword, userguid } = req.body;
  if (username === expectedUsername && userguid === '123123') {
    first_login = false;
    expectedPassword = newPassword;
    response = RESPONSES.password_reset_successful;
  } else {
    response = RESPONSES.not_authenticated;
  }
  res.status(response.status);
  res.json(response.data);
});

app.post('/login2step', function (req, res) {

  const { username, password, generatedToken } = req.body;
  const isValid = username === expectedUsername && password === expectedPassword && otplib.authenticator.check(generatedToken, secret);
  if (isValid) {
    if (!enrolled) {
      enrolled = true;
    }
    response = RESPONSES.auth_successful;
  } else {
    response = RESPONSES.not_authenticated;
  }
  res.status(response.status);
  res.json(response.data);
});

app.listen(8088);
