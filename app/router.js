'use strict';

module.exports = (app) => {
  app.get('/', 'home.index');
  app.get('/user/:loginname', 'user.show');

};
