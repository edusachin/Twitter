const Joi = require("joi");

//Validation for Customer Sign Up API
function validateCustomerUpdate(user) {
  const schema = {
    user_id: Joi.string(),
    name: Joi.string(),
    email_id: Joi.string().email(),
    password: Joi.allow(null),
    address: Joi.string(),
    phone_number: Joi.string()
  };

  return Joi.validate(user, schema);
}

//Validation for Restaurant Sign Up API
function validateRestaurantUpdate(restaurant) {
  const schema = {
    user_id: Joi.string(),
    name: Joi.string(),
    email_id: Joi.string().email(),
    password: Joi.allow(null),
    address: Joi.string(),
    phone_number: Joi.string(),
    res_name: Joi.string(),
    res_cuisine: Joi.string(),
    res_zip_code: Joi.number(),
    res_image: Joi.string()
  };

  return Joi.validate(restaurant, schema);
}

exports.validateCustomerUpdate = validateCustomerUpdate;
exports.validateRestaurantUpdate = validateRestaurantUpdate;
