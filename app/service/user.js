'use strict'

const assert = require('assert');
var uuid    = require('node-uuid');
var pine = require('pine.js');

class UserService extends pine.Service {

  /**
   * 根据用户名列表查找用户列表
   *
   * @param {Array} names 用户名列表
   */
  getUsersByNames(names) {
    if (names.length === 0) {
      return [];
    }
    return this.app.model.User.find({ loginname: { $in: names } }, {fields: {loginname:1,create_at:1,score:1}});
  }

  /**
   * 根据登录名查找用户
   * Callback:
   * - err, 数据库异常
   * - user, 用户
   * @param {String} loginName 登录名
   */
  getUserByLoginName (loginName) {
    return this.app.model.User.findOne({'loginname': new RegExp('^'+loginName+'$', "i")});
  }

  /**
   * 根据用户ID，查找用户
   *
   * @param {String} id 用户ID
   */
  getUserById (id) {
    if (!id) {
      return null;
    }
    return this.app.model.User.findOne({_id: id});
  }

  /**
   * 根据邮箱，查找用户
   * Callback:
   * - err, 数据库异常
   * - user, 用户
   * @param {String} email 邮箱地址
   * @param {Function} callback 回调函数
   */
  getUserByMail (email) {
    return this.app.model.User.findOne({email: email});
  }

  /**
   * 根据用户ID列表，获取一组用户
   * Callback:
   * - err, 数据库异常
   * - users, 用户列表
   * @param {Array} ids 用户ID列表
   * @param {Function} callback 回调函数
   */
  getUsersByIds (ids) {
    return this.app.model.User.find({'_id': {'$in': ids}});
  }

  /**
   * 根据关键字，获取一组用户
   * Callback:
   * - err, 数据库异常
   * - users, 用户列表
   * @param {String} query 关键字
   * @param {Object} opt 选项
   * @param {Function} callback 回调函数
   */
  getUsersByQuery (query, opt) {
    return this.app.model.User.find(query, '', opt);
  };

  /**
   * 根据查询条件，获取一个用户
   * Callback:
   * - err, 数据库异常
   * - user, 用户
   * @param {String} name 用户名
   * @param {String} key 激活码
   * @param {Function} callback 回调函数
   */
  getUserByNameAndKey (loginname, key) {
    return this.app.model.User.findOne({loginname: loginname, retrieve_key: key});
  };

  newAndSave (name, loginname, pass, email, avatar_url, active) {
    var user         = new this.app.model.User();
    user.name        = loginname;
    user.loginname   = loginname;
    user.pass        = pass;
    user.email       = email;
    user.avatar      = avatar_url;
    user.active      = active || false;
    user.accessToken = uuid.v4();

    return user.save();
  }

  makeGravatar (email) {
    return 'http://www.gravatar.com/avatar/' + pine.util.md5(email.toLowerCase()) + '?size=48';
  }

  getGravatar (user) {
    return user.avatar || this.makeGravatar(user);
  }
}

module.exports = UserService;
