const Users = require('../../models/users');
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let getUserTweet = async (msg, callback) => {
    console.log("in getUserTweet");
    let response = {};
    let err = {};
    try {
        let userTweets = await Users.findById(msg.user_id, { tweets: 1, retweeted_tweets: 1 }).populate("tweets", "tweet_text tweet_owner").populate("retweeted_tweets", "tweet_text tweet_owner");
        if (!userTweets) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.ACTION_NOT_COMPLETE;
            return callback(err, null);
        }
        else {
            response.status = STATUS_CODE.SUCCESS;
            response.data = JSON.stringify(userTweets);
            return callback(null, response);
        }
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};
exports.getUserTweet = getUserTweet;