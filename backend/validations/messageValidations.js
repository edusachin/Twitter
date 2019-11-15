"use strict";
const Joi = require("joi");

//Validation for Message API
function validateMessage(user) {
  const schema = {
    sender_id: Joi.string().required(),
    receiver_id: Joi.string().required(),
    message_content: Joi.string()
  };

  return Joi.validate(user, schema);
}

exports.validateMessage = validateMessage;
