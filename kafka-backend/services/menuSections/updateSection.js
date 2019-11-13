const _ = require("lodash");
const { User } = require("../../models/userModel");
const { Section } = require("../../models/sectionModel");
const { STATUS_CODE } = require("../../utils/constants");

async function update_section(req, callback) {
  console.log("Inside received reply in kafka backend");
  let response = {};
  let err = {};

  try {
    let user = await User.findOne({
      _id: req.user_id
    });
    if (!user) {
      err.status = STATUS_CODE.BAD_REQUEST_ERROR_STATUS;
      err.message = "User does not exist";
      return callback(err, null);
    } else {
      const section = user.restaurant.menu_sections.id(req.menu_section_id);
      if (!section) {
        err.status = STATUS_CODE.BAD_REQUEST_ERROR_STATUS;
        err.message = "Section does not exist";
        return callback(err, null);
      } else {
        section.menu_section_name = req.menu_section_name;

        let update = await user.save();

        if (update) {
          response.status = STATUS_CODE.SUCCESS_STATUS;
          response.data = "Menu Section Updated";
          return callback(null, response);
        } else {
          err.status = STATUS_CODE.BAD_REQUEST_ERROR_STATUS;
          err.message = "Some thing went wrong";
          return callback(err, null);
        }
      }
    }
  } catch (error) {
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS;
    err.message = "Internal Server Error";
    return callback(err, null);
  }
}

exports.update_section = update_section;
