"use strict";
const Joi = require("joi");

//Validation for Customer Sign Up API
function validateMenuSection(user) {
  const schema = {
    menu_section_name: Joi.string().required(),
    restaurant_id: Joi.string().required(),
    user_id: Joi.string().required()
  };

  return Joi.validate(user, schema);
}

exports.validateMenuSection = validateMenuSection;
