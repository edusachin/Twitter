"use strict";
const Conversations = require("../../models/conversations");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let sendMessage = async (msg, callback) => {
    let response = {};
    let err = {};
    try {
        console.log(msg);
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};

exports.sendMessage = sendMessage;