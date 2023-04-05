const Joi = require("joi");

const bike_category = Joi.object({
  category_name: Joi.string().required(),
  description: Joi.string(),
});

module.exports = bike_category;
