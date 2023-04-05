const Joi = require('joi');

const giveOtp = Joi.object({
    contact_number: Joi.string().pattern(/^\d{2}\d{3}\d{2}\d{2}$/).required()
})

module.exports = giveOtp