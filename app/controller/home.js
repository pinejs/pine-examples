'use strict';

const assert = require('assert');

class HomeController {
  index (ctx, next){
    ctx.body = 'Hello, pine.js';
  }
}

module.exports = HomeController;
