"use strict";
const Users = require('../../models/users');
const Conversation = require("../../models/conversations");

const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let getConversations = async (msg, callback) => {
    let response = {};
    let err = {};
    try {
        let user = await Users.findById(msg.user_id)
        let userConversations = await Conversation.find({$or:[{"user1": msg.user_id},{ "user2": msg.user_id}]});

        response.status = STATUS_CODE.SUCCESS;
        response.data = JSON.stringify(userConversations);
        return callback(null,response);

    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};

exports.getConversations = getConversations;