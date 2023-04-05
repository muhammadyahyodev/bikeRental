const Joi = require("joi");

const ads = Joi.object({
  ad_name: Joi.string().alphanum().required(),
  shop_id: Joi.number().strict(),
  banner_image: Joi.string().alphanum(),
  description: Joi.string(),
  start_date: Joi.date(),
  end_date: Joi.date().required(),
  ad_location: Joi.string().required(),
  amount: Joi.number().required(),
  user_id: Joi.number().required(),
});

module.exports = ads
