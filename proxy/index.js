// eslint-disable-next-line
const proxy = require('http-proxy-middleware');
const convert = require('koa-connect');
const Koa = require('koa');
const http = require('http');

const app = new Koa();
app.use(convert(proxy.createProxyMiddleware('/', {
  //target: 'https://pm4ml.dev.uncdf.uncdfmfi.org', // DEVELOPMENT
  target: 'http://localhost:4000', // QA
  pathRewrite: {
    '^/api': '/',
  },
  changeOrigin: true,
  secure: false
})));


http.createServer({}, app.callback()).listen(10000);
