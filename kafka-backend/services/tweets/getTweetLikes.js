"use strict";
const Tweet = require("../../models/tweets");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let getTweetLikes = async (msg, callback) => {
    let response = {};
    let err = {};
    try {
        let tweetLikes = await Tweet.findById(msg.tweet_id, { likes: 1 });
        console.log(tweetLikes);
        if (!tweetLikes) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.ACTION_NOT_COMPLETE;
            return callback(err, null);
        }
        else {
            response.status = STATUS_CODE.SUCCESS;
            response.data = JSON.stringify(tweetLikes);
            return callback(null, response);
        }
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};
exports.getTweetLikes = getTweetLikes;