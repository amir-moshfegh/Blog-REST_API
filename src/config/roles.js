const { roles, permission } = require('./enums');

const roleRights = new Map();
roleRights.set(roles.ADMIN, [
  // users
  permission.GET_USERS,
  permission.MANAGE_USERS,
  // posts
  permission.CHANGE_STATUS_POST,
  permission.GET_POSTS,
  permission.MANAGE_POSTS,
  // comments
  permission.MANAGE_COMMENT,
  permission.GET_COMMENT,
  permission.CHANGE_STATUS_COMMENT,
]);

roleRights.set(roles.BLOGGER, [
  // posts
  permission.GET_POSTS,
  permission.MANAGE_POSTS,
  // comments
  permission.MANAGE_COMMENT,
  permission.GET_COMMENT,
]);

roleRights.set(roles.USER, [
  // posts
  permission.GET_POSTS,
  // comments
  permission.MANAGE_COMMENT,
  permission.GET_COMMENT,
]);

module.exports = {
  roles,
  roleRights,
};
