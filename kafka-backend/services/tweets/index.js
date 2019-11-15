const { postTweet } = require("./postTweet");

function handle_request(msg, callback) {
    switch (msg.route) {
        case "post_tweet":
            postTweet(msg, callback);
            break;
    }
}

exports.handle_request = handle_request;