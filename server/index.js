const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/config', function (req, res) {
  res.send({
    API_BASE_URL: process.env.API_BASE_URL,
  });
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8080);