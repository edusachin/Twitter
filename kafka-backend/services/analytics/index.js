"use strict";
const { getTopViewedTweets } = require("./getTopViewedTweets");

function handle_request(msg, callback) {
    switch (msg.route) {
        case "get_top_viewed_tweets":
            getTopViewedTweets(msg, callback);
            break;
    }
}

exports.handle_request = handle_request;