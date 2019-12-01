const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");

/**
 * To get Top 10 tweets by views
 */
router.get("/topViewedTweets", async (req, res) => {
    let msg = {};
    msg.count = 10,
    msg.route = "get_top_viewed_tweets";
    kafka.make_request("analytics", msg, function (err, results) {
        if (err) {
            console.log("-------error: tweet:get/:id---------");
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

/**
 * To get Top 10 tweets by likes
 */
router.get("/topLikedTweets/:user_id", async (req, res) => {
    let msg = {};
    msg.count = 10;
    msg.route = "get_top_liked_tweets";
    msg.user_id = req.params.user_id;
    kafka.make_request("analytics", msg, function (err, results) {
        if (err) {
            console.log("-------error: tweet:get/:id---------");
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

/**
 * To get Top 5 tweets by retweets
 */
router.get("/topRetweetedTweets", async (req, res) => {
    let msg = {};
    msg.count = 5,
        msg.route = "get_top_retweeted_tweets";
    kafka.make_request("analytics", msg, function (err, results) {
        if (err) {
            console.log("-------error: tweet:get/:id---------");
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

module.exports = router;