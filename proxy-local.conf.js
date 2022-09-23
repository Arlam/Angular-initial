'use strict';

const proxyConfig = [
  {
    context: '/api',
    target: 'http://localhost:8080',
    secure: false,
    // it's very helpful to behave as reverse proxy
    changeOrigin: false,
  },
];

module.exports = proxyConfig;
