const Joi = require("joi");

const user = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(4).alphanum().required(),
  image: Joi.string(),
  fullname: Joi.string().required(),
  contact: Joi.string().pattern(/^\d{2}\d{3}\d{2}\d{2}/),
  email: Joi.string().email().required(),
  user_category_id: Joi.number().required(),
  status: Joi.boolean()
});

module.exports = user;
