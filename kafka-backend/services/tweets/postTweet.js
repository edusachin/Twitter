"use strict";
const Tweet = require("../../models/tweets");
const Users = require('../../models/users');
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let postTweet = async (msg, callback) => {
    let response = {};
    let err = {};
    try {
        let user = await Users.findById(msg.user_id);
        let newTweet = new Tweet({
            tweet_owner: msg.user_id,
            tweet_text: msg.tweet_text,
            tweet_date: new Date(Date.now())
        });
        if (!user) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.ACTION_NOT_COMPLETE;
            return callback(err, null);
        }
        else {
            let addedTweet = await newTweet.save();
            if (addedTweet) {
                user.tweets.push(addedTweet._id);
                user.save(function (error, updatedUser) {
                    if (error) {
                        err.status = STATUS_CODE.BAD_REQUEST;
                        err.data = MESSAGES.ACTION_NOT_COMPLETE;
                        return callback(err, null);
                    }
                    else {
                        response.status = STATUS_CODE.SUCCESS;
                        response.data = addedTweet._id;
                        return callback(null, response);
                    }
                });
            }
            else {
                err.status = STATUS_CODE.BAD_REQUEST;
                err.data = MESSAGES.ACTION_NOT_COMPLETE;
                return callback(err, null);
            }
        }

    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};
exports.postTweet = postTweet;