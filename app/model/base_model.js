/**
 * 所有Model的基类
 */
const assert = require('assert');
const moment = require('moment');
const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';

module.exports = function (schema) {
  schema.methods.createdAt = function () {
    return moment(this.created_at).format(DEFAULT_FORMAT);
  };

  schema.methods.updatedAt = function () {
    return moment(this.updated_at).format(DEFAULT_FORMAT);
  };
};
