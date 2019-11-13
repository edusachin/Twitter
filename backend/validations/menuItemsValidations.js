const Joi = require("joi");

//Validation for Customer Sign Up API
function validateMenuItem(user) {
  const schema = {
    menu_section_name: Joi.string().required(),
    menu_section_id: Joi.string().required(),
    user_id: Joi.string().required(),
    item_name: Joi.string().required(),
    item_price: Joi.number().required(),
    item_description: Joi.string().required(),
    item_image: Joi.allow(null)
  };

  return Joi.validate(user, schema);
}

function validateMenuItemUpdate(user) {
  const schema = {
    menu_section_name: Joi.string().required(),
    menu_section_id: Joi.string().required(),
    user_id: Joi.string().required(),
    item_name: Joi.string().required(),
    item_price: Joi.number().required(),
    item_description: Joi.string().required(),
    item_image: Joi.allow(null),
    item_id: Joi.string().required()
  };
  return Joi.validate(user, schema);
}

function validateMenuItemDelete(user) {
  const schema = {
    menu_section_id: Joi.string().required(),
    user_id: Joi.string().required(),
    item_id: Joi.string().required()
  };
  return Joi.validate(user, schema);
}

exports.validateMenuItemDelete = validateMenuItemDelete;
exports.validateMenuItemUpdate = validateMenuItemUpdate;
exports.validateMenuItem = validateMenuItem;
