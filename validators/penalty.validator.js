const Joi = require("joi");

const penalty = Joi.object({
  rental_id: Joi.number().required().strict(),
  penalty_amount: Joi.number().required(),
  payment_status: Joi.boolean().required().strict(),
  remarks: Joi.string(),
  paid_by: Joi.string().required(),
  user_id: Joi.number().required().strict(),
});

module.exports = penalty;
