const Joi = require("joi");

//Validation for Customer Sign Up API
function validateUser(user) {
  const schema = {
    name: Joi.string().required(),
    email_id: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
    address: Joi.string().required(),
    phone_number: Joi.string().required()
  };

  return Joi.validate(user, schema);
}

//Validation for Restaurant Sign Up API
function validateRestaurant(restaurant) {
  const schema = {
    name: Joi.string().required(),
    email_id: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
    address: Joi.string().required(),
    phone_number: Joi.string().required(),
    res_name: Joi.string().required(),
    res_cuisine: Joi.string().required(),
    res_zip_code: Joi.string().required(),
    res_image: Joi.string(),
  };

  return Joi.validate(restaurant, schema);
}

exports.validateUser = validateUser;
exports.validateRestaurant = validateRestaurant;
