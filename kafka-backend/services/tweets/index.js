"use strict";
const { postTweet } = require("./postTweet");
const { getUserTweet } = require("./getUserTweets");
const { postRetweet } = require("./postRetweet");
const { deleteTweet } = require("./deleteTweet");
function handle_request(msg, callback) {
    console.log("----in kafka-backend: tweets-----");
    switch (msg.route) {
        case "post_tweet":
            postTweet(msg, callback);
            break;
        case "get_user_tweet":
            getUserTweet(msg, callback);
            break;
        case "post_retweet":
            postRetweet(msg, callback);
            break;
        case "delete_tweet":
            deleteTweet(msg, callback);
            break;
    }
}

exports.handle_request = handle_request;