"use strict";
const { postRetweet } = require("./postRetweet");
const { postLikes } = require("./postLikes");
const { postReplies } = require("./postReplies");

function handle_request(msg, callback) {
    switch (msg.route) {
        case "post_retweet":
            postRetweet(msg, callback);
            break;
        case "post_likes":
            postLikes(msg, callback);
            break;
        case "post_replies":
            postReplies(msg, callback);
            break;
    }
}

exports.handle_request = handle_request;