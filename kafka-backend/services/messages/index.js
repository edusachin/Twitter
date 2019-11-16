"use strict";
const { sendMessage } = require("./sendMessage");
const { getConversations } = require("./getConversations");
const { getUserConversation } = require("./getUserConversation");


let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "send_message":
      sendMessage(msg, callback);
      break;
    case "get_conversations":
      getConversations(msg, callback);
      break;
    case "get_user_conversation":
      getUserConversation(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;