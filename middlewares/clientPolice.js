const jwt = require("../services/Jwt");
const Client = require("../models/Client");

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
    const { id, date} = await jwt.verifyAccess(token);
    let is_user = await Client.findOne({ where: { client_id: id } });
    if (!is_user) {
      ctx.cody = { message: "You are not registrated" };
      if (!date) {
        ctx.body = { message: "You have not a permission" };
      }
    }
    return next();
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Auhtor have not signed in 3", error: error.message };
  }
};
