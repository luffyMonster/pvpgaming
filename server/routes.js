module.exports = function(app) {
  // Insert routes below
  app.use('/api/thing', require('./api/thing'));
  app.use('/api/auth', require('./api/auth'));
  app.use('/api/user', require('./api/user'));
  app.use('/api/test', require('./api/test'));
  app.use('/api/game', require('./api/game'));
  app.use('/api/test', require('./api/test'));
  app.use('/api/admin/search/', require('./api/admin/search'));
}
