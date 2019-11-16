"use strict";
const { sendMessage } = require("./sendMessage");

let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "send_message":
      sendMessage(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;