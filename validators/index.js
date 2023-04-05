const ads = require("./ads.validator");
const bike_category = require("./bike_category.validator");
const bike_info = require("./bike_info.validator");
const client = require("./client.validator");
const payment = require("./payment.validator");
const penalty = require("./penalty.validator");
const rental = require("./rental.validator");
const shopinfo = require("./shopinfo.validator");
const user_group = require("./user_group.validator");
const user = require("./user.validator");
const otp = require("./otp.validator");
const give_otp = require('./give-otp.validator')

module.exports = {
  ads,
  bike_category,
  bike_info,
  client,
  payment,
  penalty,
  rental,
  shopinfo,
  user_group,
  user,
  otp,
  give_otp,
};
