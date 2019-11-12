const Joi = require("joi");

//Validation for Customer Profile API
function validateCustomerProfile(user) {
  const schema = {
    user_id: Joi.string().required()
  };

  return Joi.validate(user, schema);
}

//Validation for Restaurant Profile API
function validateRestaurantProfile(restaurant) {
  const schema = {
    user_id: Joi.string().required()
  };

  return Joi.validate(restaurant, schema);
}

exports.validateCustomerProfile = validateCustomerProfile;
exports.validateRestaurantProfile = validateRestaurantProfile;
