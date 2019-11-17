"use strict";
const Users = require('../../models/users');
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let getUserLikedTweets = async (msg, callback) => {
    let response = {};
    let err = {};
    try {
        let userLikedTweets = await Users.findById(msg.user_id, { liked: 1 });
        console.log(userLikedTweets);
        if (!userLikedTweets) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.ACTION_NOT_COMPLETE;
            return callback(err, null);
        }
        else {
            response.status = STATUS_CODE.SUCCESS;
            response.data = JSON.stringify(userLikedTweets);
            return callback(null, response);
        }
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};
exports.getUserLikedTweets = getUserLikedTweets;