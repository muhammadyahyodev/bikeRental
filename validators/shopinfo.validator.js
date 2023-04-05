const Joi = require("joi");

const shopinfo = Joi.object({
  shop_name: Joi.string(),
  owner_name: Joi.string().required().strict(),
  address: Joi.string().required(),
  email_address: Joi.string().email().required().strict(),
  contact_no: Joi.string().required().pattern(/^\d{2}\d{3}\d{2}\d{2}/),
  website: Joi.string().default("https://google.com"),
  updated_by: Joi.number().required().strict(),
});

module.exports = shopinfo;
