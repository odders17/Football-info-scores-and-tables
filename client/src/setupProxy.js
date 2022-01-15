const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/api/auth', {
      target: 'https://football-leagues-info.herokuapp.com',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/api/leagues', {
      target: 'https://football-leagues-info.herokuapp.com',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/api/users', {
      target: 'https://football-leagues-info.herokuapp.com',
      changeOrigin: true
    })
  );
};