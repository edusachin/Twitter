const { get_section } = require("./getSection");
const { insert_section } = require("./insertSection");
const { update_section } = require("./updateSection");
const { delete_section } = require("./deleteSection");

function handle_request(service, callback) {
  console.log("Inside sign up service === ", service);
  switch (service.type) {
    case "get":
      get_section(service.req, callback);
      break;
    case "insert":
      insert_section(service.req, callback);
      break;
    case "update":
      update_section(service.req, callback);
      break;
    case "delete":
      delete_section(service.req, callback);
      break;
  }
}

exports.handle_request = handle_request;
