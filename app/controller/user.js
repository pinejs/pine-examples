'use strict';

const assert = require('assert');
var pine = require('pine.js');

class UserController extends pine.Controller {
  async show (ctx, next){
    let loginName = ctx.params.loginname;
    this.app.logger.info('getUserByLoginName: %s', loginName);
    let user = await this.app.service.User.getUserByLoginName(loginName);
    ctx.body = user || {};
  }
}

module.exports = UserController;
