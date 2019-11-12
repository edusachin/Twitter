const _ = require("lodash");
const { User } = require("../../models/userModel");
const { Section } = require("../../models/sectionModel");

async function insert_section(req, callback) {
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
      menu_section = new Section(
        _.pick(req, ["menu_section_name", "restaurant_id"])
      );

      let menu_sections = await User.findOne({
        _id: req.user_id,
        "restaurant.menu_sections": {
          $elemMatch: {
            menu_section_name: req.menu_section_name
          }
        }
      });
      console.log(menu_sections);
      if (menu_sections) {
        err.status = 400;
        err.message = "Menu Section already exists";
        return callback(err, null);
      } else {
        user.restaurant.menu_sections.push(menu_section);

        let insert = await user.save();

        //user.restaurant.menu_sections;
        console.log(user.restaurant.menu_sections);
        if (insert) {
          response.status = 200;
          response.data = "Menu Section Added";
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

exports.insert_section = insert_section;
