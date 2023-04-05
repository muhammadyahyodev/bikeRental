const Joi = require("joi");

const rental = Joi.object({
  bike_id: Joi.number().required().strict(),
  client_id: Joi.number().required().strict(),
  rental_start_date: Joi.date().strict(),
  rental_end_date: Joi.date().strict(),
  total_amaount: Joi.number().required().strict(),
  payment_status: Joi.boolean().default(false),
  rental_status: Joi.boolean(),
  remarks: Joi.string(),
  user_id: Joi.number().required().strict(),
});

module.exports = rental;
