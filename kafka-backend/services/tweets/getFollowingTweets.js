"use strict";
const User = require("../../models/users")
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

const tweetFormatter = (tweet, user, output) => {
    let tweetObject = {
        user_id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        user_name: user.user_name,
        tweet_id: tweet._id,
        tweet_owner: tweet.tweet_owner,
        tweet_text: tweet.tweet_text,
        tweet_date: tweet.tweet_date,
        tweet_images: tweet.tweet_image,
        likes_count: tweet.likes ? tweet.likes.length : 0,
        replies_count: tweet.replies ? tweet.replies.length : 0,
        retweets_count: tweet.retweeters ? tweet.retweeters.length : 0,
        likes: tweet.likes
    };
    output.push(tweetObject);
};

let getFollowingTweets = async (msg, callback) => {
    let response = {};
    let err = {};
    let output = [];
    try {
        let userTweets = await User.findById(msg.user_id, { following: 1 })
            .populate({
                path: "following",
                select: "first_name last_name user_name tweets retweeted_tweets",
                match: { "is_active": true },
                populate: {
                    path: "tweets retweeted_tweets",
                    select: 'tweet_text tweet_owner tweet_date likes replies retweeters tweet_image',
                    model: "Tweet",
                    populate: {
                        path: 'tweet_owner',
                        model: 'User',
                        select: 'first_name last_name user_name'
                    }
                }
            });
        if (!userTweets) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.ACTION_NOT_COMPLETE;
            return callback(err, null);
        }
        else {
            userTweets.following.map(user => {
                user.tweets.map(tweet => tweetFormatter(tweet, user, output));
                user.retweeted_tweets.map(tweet => tweetFormatter(tweet, user, output));
            });
            output.sort((tweet1, tweet2) => (tweet1.tweet_date < tweet2.tweet_date) ? 1 : -1);
            response.status = STATUS_CODE.SUCCESS;
            response.data = JSON.stringify(output);
            return callback(null, response)
        }
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};
exports.getFollowingTweets = getFollowingTweets;