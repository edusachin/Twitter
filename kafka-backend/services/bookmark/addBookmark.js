"use strict";
const Users = require('../../models/users');
const Tweets = require('../../models/tweets');

const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let addBookmark = async (msg, callback) => {
    let response = {};
    let err = {};
    try {
        let tweet = await Tweets.findById(msg.tweet_id);
        let user = await Users.findById(msg.user_id);

        if (!tweet || !user) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.DATA_NOT_FOUND;
            return callback(err, null);
        }

        if (user.bookmarks.includes(msg.tweet_id)) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.DATA_ALREADY_EXISTS;
            return callback(err, null);
        } else {
            let userUpdated = await Users.findByIdAndUpdate(msg.user_id, { $push: { "bookmarks": msg.tweet_id } })

            if (!userUpdated) {
                throw err;
            } else {
                response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
                response.data = MESSAGES.CREATE_SUCCESSFUL;
                return callback(null, response);
            }
        }
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};

exports.addBookmark = addBookmark;