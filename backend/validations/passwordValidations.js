"use strict";
const Joi = require("joi");

//Validation for Profile API
function validatePassword(user) {
  const schema = {
    email_id: Joi.string().email().required(),
    password: Joi.string().required()
  };

  return Joi.validate(user, schema);
}

exports.validatePassword = validatePassword;
