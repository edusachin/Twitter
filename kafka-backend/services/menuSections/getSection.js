const _ = require("lodash");
const { User } = require("../../models/userModel");
const { Section } = require("../../models/sectionModel");

async function get_section(req, callback) {
  console.log("Inside received reply in kafka backend");
  let response = {};
  let err = {};

  try {
    let owner = await User.findOne({
      _id: req.user_id
    });
    if (!owner) {
      err.status = 400;
      err.message = "User does not exist";
      return callback(err, null);
    } else {
      response.status = 200;
      response.data = _.pick(owner, ["restaurant.menu_sections"]);
      return callback(null, response);
    }
  } catch (error) {
    err.status = 500;
    err.message = "Internal Server Error";
    return callback(err, null);
  }
}

exports.get_section = get_section;
