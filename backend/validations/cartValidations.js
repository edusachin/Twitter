"use strict";
const Joi = require("joi");

function validatePlaceOrder(user) {
  const cartItemsSchema = Joi.object({
    item_image: Joi.allow(null),
    _id: Joi.string().required(),
    item_description: Joi.string().required(),
    item_price: Joi.number().required(),
    menu_section_name: Joi.string().required(),
    menu_section_id: Joi.string().required(),
    item_name: Joi.string().required(),
    item_quantity: Joi.number().required(),
    item_total_price: Joi.number().required()
  });
  const schema = {
    user_id: Joi.string().required(),
    res_id: Joi.string().required(),
    status: Joi.string().required(),
    sub_total: Joi.number().required(),
    delivery: Joi.number().required(),
    tax: Joi.string().required(),
    total: Joi.string().required(),
    cart_items: Joi.array().items(cartItemsSchema)
  };

  // const arraySchema = joi.array().items(cartItemsSchema)
  //.required();
  return Joi.validate(user, schema);
}

exports.validatePlaceOrder = validatePlaceOrder;
