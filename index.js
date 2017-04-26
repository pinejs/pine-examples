'use strict';

const path = require('path');
const { Application } = require('pine.js');

const app = new Application({
  baseDir: __dirname,
  excludes: {
    controller: ['index.js'],
    service: ['index.js'],
    model: ['index.js', 'base_model.js']
  }
})

console.log(app.config);

// x-response-time
app.use(async function (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async function (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.start();
