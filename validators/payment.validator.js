const Joi = require("joi");

const payment = Joi.object({
  rental_id: Joi.number().strict().required(),
  payment_type: Joi.number().strict().required(),
  pay_by: Joi.string().required(),
  payment_date: Joi.date().strict(),
  remarks: Joi.string(),
  user_id: Joi.string(),
});

module.exports = payment;
