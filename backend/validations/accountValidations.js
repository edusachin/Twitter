"use strict";
const Joi = require("joi");

function validateAccount(user) {
  const schema = {
    user_id: Joi.string().required()
  };

  return Joi.validate(user, schema);
}

exports.validateAccount = validateAccount;
