"use strict";
const User = require("../../models/users")
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let getFollowersTweets = async (msg, callback) => {
    let response = {};
    let err = {};
    let allTweets = {};
    try {
        let userTweets = await User.findById(msg.user_id, { following: 1 }).populate({
            path: "following",
            select: "first_name last_name tweets retweeted_tweets",
            match: { "is_active": true },
            populate: {
                path: "tweets retweeted_tweets",
                model: "Tweet",
                populate: {
                    path: "tweet_owner",
                    model: "User"
                }
            }
        });
        userTweets.following.map(data => {
            if (!allTweets.hasOwnProperty(data._id)) {
                allTweets[data._id] = [...data.tweets, ...data.retweeted_tweets, data.first_name, data.last_name];
            }
        })
        response.status = STATUS_CODE.SUCCESS;
        response.data = JSON.stringify(allTweets);
        return callback(null, response)
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};
exports.getFollowersTweets = getFollowersTweets;