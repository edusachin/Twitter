const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { validateTweet } = require("../validations/tweetValidations");

router.get("/:id", async (req, res) => {
    let msg = {
        user_id: req.params.id,
        route: "get_user_tweet"
    }
    console.log(msg);
    kafka.make_request("tweets", msg, function (err, results) {
        if (err) {
            console.log("-------error: tweet:get/:id---------");
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });

});

router.post("/", async (req, res) => {
    const { error } = validateTweet(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    let msg = req.body;
    msg.route = "post_tweet";
    kafka.make_request("tweets", msg, function (err, results) {
        if (err) {
            console.log("-------error: tweet:post/---------");
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

router.post("/retweet", async (req, res) => {
    const { error } = false;
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    let msg = req.body;
    msg.route = "post_retweet";
    kafka.make_request("tweets", msg, function (err, results) {
        if (err) {
            console.log("-------error: tweet:post/retweet/---------");
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});


router.post("/deleteTweet", async (req, res) => {
    const { error } = false;
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    let msg = req.body;
    msg.route = "delete_tweet";
    kafka.make_request("tweets", msg, function (err, results) {
        if (err) {
            console.log("-------error: tweet:post/deletetweet/---------");
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

module.exports = router;