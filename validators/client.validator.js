const Joi = require("joi");

const client = Joi.object({
  image: Joi.string().strict(),
  client_name: Joi.string().required(),
  email_address: Joi.string().email().required(),
  contact_number: Joi.string().strict().pattern(/^\d{2}\d{3}\d{2}\d{2}/).required(),
  complete_address: Joi.string(),
  username: Joi.string().strict().required(),
  password: Joi.string().strict().min(4).alphanum().required(),
  status: Joi.boolean().default(true),
});

module.exports = client;

