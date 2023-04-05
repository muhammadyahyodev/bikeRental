const Joi = require("joi");

const user_group = Joi.object({
  group_name: Joi.string().required().strict(),
  description: Joi.string(),
  allow_add: Joi.boolean().default(false),
  allow_edit: Joi.boolean().default(false),
  allow_delete: Joi.boolean().default(false),
  allow_import: Joi.boolean().default(false),
  allow_export: Joi.boolean().default(false),
});

module.exports = user_group;
