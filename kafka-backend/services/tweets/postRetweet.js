const Tweet = require("../../models/tweets");
const Users = require('../../models/users');
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");


// needs to be optimized
let postRetweet = async (msg, callback) => {
    let response = {};
    let err = {};
    try {
        let { user_id, tweet_id } = msg;
        let user = await Users.findById(user_id);
        if (!user) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.ACTION_NOT_COMPLETE;
            return callback(err, null);
        }
        else {
            user.retweeted_tweets.push(tweet_id);
            let updatedUser = await user.save();
            // use findByIdandUpdate
            let target_tweet = await Tweet.findById(tweet_id);
            target_tweet.retweeters.push(user_id);
            let updated_tweet = await target_tweet.save();
            if (!updatedUser || !updated_tweet) {
                err.status = STATUS_CODE.BAD_REQUEST;
                err.data = MESSAGES.ACTION_NOT_COMPLETE;
                return callback(err, null);
            }
            else {
                response.status = STATUS_CODE.SUCCESS;
                response.data = MESSAGES.UPDATE_SUCCESSFUL;
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
exports.postRetweet = postRetweet;