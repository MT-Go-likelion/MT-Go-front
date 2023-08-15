const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/api', {
      // 백엔드 주소
      target: 'https://ki0ent.herokuapp.com',
      changeOrigin: true,
    }),
  );
};
