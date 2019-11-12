const _ = require("lodash");
const { User } = require("../../models/userModel");
const { Section } = require("../../models/sectionModel");

async function update_section(req, callback) {
  console.log("Inside received reply in kafka backend");
  let response = {};
  let err = {};

  try {
    let user = await User.findOne({
      _id: req.user_id
    });
    if (!user) {
      err.status = 400;
      err.message = "User does not exist";
      return callback(err, null);
    } else {
      const section = user.restaurant.menu_sections.id(req.menu_section_id);
      if (!section) {
        err.status = 400;
        err.message = "Section does not exist";
        return callback(err, null);
      } else {
        section.menu_section_name = req.menu_section_name;

        let update = await user.save();

        if (update) {
          response.status = 200;
          response.data = "Menu Section Updated";
          return callback(null, response);
        } else {
          err.status = 400;
          err.message = "Some thing went wrong";
          return callback(err, null);
        }
      }
    }
  } catch (error) {
    err.status = 500;
    err.message = "Internal Server Error";
    return callback(err, null);
  }
}

exports.update_section = update_section;
