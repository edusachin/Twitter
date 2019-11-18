"use strict";
const Tweet = require("../../models/tweets");
const User = require("../../models/users")
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let getFollowersTweets = async (msg, callback) => {
    let response = {};
    let err = {};
    try {
        let tweets = await User.findById(msg.user_id, { following: 1 }).populate({
            path: "following",
            select: "tweets retweeted_tweets",
            match: { "is_active": true },
            populate: {
                path: "tweets",
                model: "Tweet"
            },
            populate: {
                path: "retweeted_tweets",
                model: "Tweet"
            }
        });
        response.status = STATUS_CODE.SUCCESS;
        response.data = JSON.stringify(tweets);
        return callback(null, response)
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};
exports.getFollowersTweets = getFollowersTweets;