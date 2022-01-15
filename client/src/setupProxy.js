const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/api/auth', {
      target: 'https://football-info-app.herokuapp.com',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/api/leagues', {
      target: 'https://football-info-app.herokuapp.com',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/api/users', {
      target: 'https://football-info-app.herokuapp.com',
      changeOrigin: true
    })
  );
};