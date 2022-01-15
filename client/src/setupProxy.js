const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/api/auth', {
      target: 'https://dashboard.heroku.com/apps/football-info-app-odders17',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/api/leagues', {
      target: 'https://dashboard.heroku.com/apps/football-info-app-odders17',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/api/users', {
      target: 'https://dashboard.heroku.com/apps/football-info-app-odders17',
      changeOrigin: true
    })
  );
};