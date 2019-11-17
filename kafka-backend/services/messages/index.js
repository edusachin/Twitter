"use strict";
const { sendMessage } = require("./sendMessage");
const { getConversations } = require("./getConversations");
const { getSearchedConversation } = require("./getSearchedConversation");


let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "send_message":
      sendMessage(msg, callback);
      break;
    case "get_conversations":
      getConversations(msg, callback);
      break;
    case "get_SearchedConversation":
      getSearchedConversation(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;