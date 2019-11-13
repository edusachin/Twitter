const _ = require("lodash");
const { User } = require("../../models/userModel");
const { Section } = require("../../models/sectionModel");

async function delete_section(req, callback) {
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
      console.log(section);
      if (!section) {
        err.status = 400;
        err.message = "Section does not exist";
        return callback(err, null);
      } else {
        let removeSection = await section.remove();
        if (removeSection) {
          const deleteSection = await user.save();
          if (deleteSection) {
            response.status = 200;
            response.data = "Menu Section Deleted";
            return callback(null, response);
          } else {
            err.status = 400;
            err.message = "Something went wrong while saving after remove";
            return callback(err, null);
          }
        } else {
          err.status = 400;
          err.message = "Something went wrong while removing section";
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

exports.delete_section = delete_section;
