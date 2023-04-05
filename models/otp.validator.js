const Joi = require("joi");

const otp = Joi.object({
    id: Joi.string().uuid().required(),
    otp_owner_id: Joi.number().required(),
    otp: Joi.string().max(8).min(4),
    expiration_time: Joi.date(),
})

module.exports = otp