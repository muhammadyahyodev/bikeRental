const jwt = require("../services/Jwt");
const User = require("../models/User");
const UserGroup = require("../models/UserGroup");

module.exports = async function (ctx, next) {
  if (ctx.request.method === "OPTIONS") {
    return next();
  }
  try {
    const authorization = ctx.headers.authorization;
    if (!authorization) {
      ctx.body = { message: "You do not have an access" };
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      ctx.body = { message: "Please log in the website" };
    }
    const { id, priviligue } = await jwt.verifyAccess(token);
    let is_user = await User.findOne({ where: { user_id: id } });
    if (!is_user) {
      ctx.cody = { message: "You are not registrated" };
    }
    let accessOption = await UserGroup.findByPk(priviligue);

    if (!accessOption.allow_add) {
      return (ctx.body = { message: "you can not add records" });
    }
    if (!accessOption.allow_edit) {
      return (ctx.body = { message: "you can not edit records" });
    }
    if (id != ctx.params.id && priviligue != 1) {
      return (ctx.body = { message: "Only admin can delete itself" });
    }
    if (!accessOption.allow_delete) {
      return (ctx.body = { message: "you can not delete records" });
    }
    return next();
  } catch (error) {
    console.log(error);
    ctx.body = {
      message: "You are not active user nowby",
      error: error.message,
    };
  }
};
