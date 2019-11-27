"use strict";
const Users = require('../../models/tweets');

let getTopViewedTweets = async (msg, callback) => {
    let response = {};
    let err = {};
    let output = [];
    const count = msg.count;
    try {
        let userTweets = await Tweets.findAll({ first_name: 1, last_name: 1, user_name: 1, tweets: 1, retweeted_tweets: 1 })
            .populate({
                path: 'tweets retweeted_tweets',
                select: 'tweet_text tweet_owner tweet_date likes replies retweeters',
                populate: {
                    path: 'tweet_owner',
                    select: 'first_name last_name user_name'
                },
                options: {
                    sort: { tweet_date: -1 },
                    skip: (page_number - 1) * page_size,
                    limit: page_size
                }
            });
        if (!userTweets) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.ACTION_NOT_COMPLETE;
            return callback(err, null);
        }
        else {
            userTweets.tweets.map(tweet => tweetFormatter(tweet, userTweets, output));
            userTweets.retweeted_tweets.map(tweet => tweetFormatter(tweet, userTweets, output));
            output.sort((tweet1, tweet2) => (tweet1.tweet_date < tweet2.tweet_date) ? 1 : -1);
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

exports.getTopViewedTweets = getTopViewedTweets;