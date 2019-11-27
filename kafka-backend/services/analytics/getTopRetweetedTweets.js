"use strict";
const Tweets = require('../../models/tweets');
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

const tweetFormatter = (tweet, output) => {
    let tweetObject = {
        tweet_id: tweet._id,
        tweet_owner: tweet.tweet_owner,
        tweet_text: tweet.tweet_text,
        tweet_date: tweet.tweet_date,
        likes_count: tweet.likes ? tweet.likes.length : 0,
        replies_count: tweet.replies ? tweet.replies.length : 0,
        retweets_count: tweet.retweeters ? tweet.retweeters.length : 0,
        likes: tweet.likes,
        view_count: tweet.view_count
    };
    output.push(tweetObject);
};

let getTopRetweetedTweets = async (msg, callback) => {
    let response = {};
    let err = {};
    let output = [];
    const count = msg.count;
    try {
        let tweets = await Tweets.find()
            .populate({
                path: 'tweet_owner',
                select: 'user_name'
            })
            .sort({ 'retweeters': -1 })
            .limit(count);

        if (!tweets) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.ACTION_NOT_COMPLETE;
            return callback(err, null);
        }
        else {
            tweets.map(tweet => tweetFormatter(tweet, output));
            response.status = STATUS_CODE.SUCCESS;
            response.data = JSON.stringify(output);
            return callback(null, response);
        }
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};

exports.getTopRetweetedTweets = getTopRetweetedTweets;