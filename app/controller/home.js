'use strict';

const assert = require('assert');
var pine = require('pine.js');

class HomeController extends pine.Controller {
  index (ctx, next){
    ctx.body = 'Hello, pine.js';
  }
}

module.exports = HomeController;
