"use strict";
const { postTweet } = require("./postTweet");
const { getUserTweets } = require("./getUserTweets");
const { postRetweet } = require("./postRetweet");
const { deleteTweet } = require("./deleteTweet");
const { postLikes } = require("./postLikes");
const { postReplies } = require("./postReplies");
const { getTweetLikes } = require("./getTweetLikes");
const { getTweetReplies } = require("./getTweetReplies");
const { getUserLikedTweets } = require("./getUserLikedTweets");
function handle_request(msg, callback) {
    switch (msg.route) {
        case "post_tweet":
            postTweet(msg, callback);
            break;
        case "get_user_tweets":
            getUserTweets(msg, callback);
            break;
        case "post_retweet":
            postRetweet(msg, callback);
            break;
        case "delete_tweet":
            deleteTweet(msg, callback);
            break;
        case "post_likes":
            postLikes(msg, callback);
            break;
        case "post_replies":
            postReplies(msg, callback);
            break;
        case "get_tweet_likes":
            getTweetLikes(msg, callback);
            break;
        case "get_tweet_replies":
            getTweetReplies(msg, callback);
            break;
        case "get_user_likes":
            getUserLikedTweets(msg, callback);
            break;
    }
}

exports.handle_request = handle_request;