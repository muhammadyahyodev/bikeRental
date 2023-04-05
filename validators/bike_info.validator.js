const Joi = require("joi");

const bike_info = Joi.object({
  bike_category_id: Joi.number().strict().required(),
  shop_id: Joi.number().strict().required(),
  bike_name: Joi.string().required(),
  specsification: Joi.string().required(),
  rent_price: Joi.number().strict().required(),
  availibility: Joi.boolean().strict().default(true),
  user_id: Joi.number().strict().required(),
});

module.exports = bike_info;
