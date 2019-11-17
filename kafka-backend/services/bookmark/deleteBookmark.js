"use strict";
const Users = require('../../models/users');
const Tweets = require('../../models/tweets');

const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let deleteBookmark = async (msg, callback) => {
    let response = {};
    let err = {};
    try {
        let user = await Users.findById(msg.user_id)
        let tweet = await Tweets.findById(msg.tweet_id);
        let updatedUser;

        if (user && tweet && user.bookmarks.includes(msg.tweet_id)) {
            user.bookmarks.remove(msg.tweet_id);
            updatedUser = await user.save();
        } else {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.DATA_NOT_FOUND;
            return callback(err, null);
        }

        if (updatedUser) {
            response.status = STATUS_CODE.SUCCESS;
            response.data = MESSAGES.DELETE_SUCCESSFUL;
            return callback(null, response);
        } else {
            err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
            err.data = MESSAGES.INTERNAL_SERVER_ERROR;
            return callback(err, null);
        }



    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};

exports.deleteBookmark = deleteBookmark;