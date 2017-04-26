module.exports = {
  // port
  port: 3000,
  // mongodb 配置
  mongo: {
   url: 'mongodb://127.0.0.1/node_club_dev',
   opts: {
     server: {poolSize: 10}
   }
  }
}
