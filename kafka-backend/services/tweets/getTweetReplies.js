"use strict";
const Tweet = require("../../models/tweets");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let getTweetReplies = async (msg, callback) => {
    let response = {};
    let err = {};
    try {
        let tweetReplies = await Tweet.findById(msg.tweet_id, { replies: 1, _id: 0 })
        console.log(tweetReplies);
        if (!tweetReplies) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.ACTION_NOT_COMPLETE;
            return callback(err, null);
        }
        else {
            response.status = STATUS_CODE.SUCCESS;
            response.data = JSON.stringify(tweetReplies);
            return callback(null, response);
        }
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};
exports.getTweetReplies = getTweetReplies;