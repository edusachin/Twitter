"use strict";
const User = require('../../models/users');
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

async function getUserLists(msg, callback) {
    console.log("inside get lists");
    let response = {};
    let err = {};
    let userArray;

    switch (msg.type) {
        case "owned":
            userArray = "owned_lists";
            break;
        case "membership":
            userArray = "membered_lists";
            break;
        case "subscription":
            userArray = "subscribed_lists";
            break;

    }

    try {
        let userLists = await User.findById(msg.user_id, { userArray: 1 }).populate(userArray);

        if (!userLists) {
            console.log("in user not found");
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.USER_NOT_EXIST;
            return callback(err, null);
        }
        else {

            response.status = STATUS_CODE.SUCCESS;
            response.data = userLists;
            return callback(null, response);

        }
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};

exports.getUserLists = getUserLists;