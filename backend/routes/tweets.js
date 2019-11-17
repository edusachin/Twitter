const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { validateTweet, validateLikes, validateReplies } = require("../validations/tweetValidations");
const { STATUS_CODE } = require("../utils/constants");

router.get("/:user_id", async (req, res) => {
    let msg = {
        user_id: req.params.user_id,
        route: "get_user_tweets"
    }

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
        console.log("-------error: tweet:post/---------");
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }
    let msg = req.body;
    msg.route = "post_tweet";
    kafka.make_request("tweets", msg, function (err, results) {
        if (err) {
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
        console.log("-------error: tweet:post/retweet/---------");
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }
    let msg = req.body;
    msg.route = "post_retweet";
    kafka.make_request("tweets", msg, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});


router.post("/delete", async (req, res) => {
    const { error } = false;
    if (error) {
        console.log("-------error: tweet:post/deletetweet/---------");
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }
    let msg = req.body;
    msg.route = "delete_tweet";
    kafka.make_request("tweets", msg, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

router.post("/likes", async (req, res) => {
    const { error } = validateLikes(req.body);
    if (error) {
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }
    let msg = req.body;
    msg.route = "post_likes";
    kafka.make_request("tweets", msg, function (err, results) {
        console.log('Inside backend');
        console.log(results);
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

router.post("/replies", async (req, res) => {
    const { error } = validateReplies(req.body);
    if (error) {
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }
    let msg = req.body;
    msg.route = "post_replies";
    kafka.make_request("tweets", msg, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

router.get("/:tweet_id/likes", async (req, res) => {
    let msg = {
        tweet_id: req.params.tweet_id,
        route: "get_tweet_likes"
    }

    kafka.make_request("tweets", msg, function (err, results) {
        if (err) {
            console.log("-------error: tweet:get_likes/:id---------");
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });

});

router.get("/:tweet_id/replies", async (req, res) => {
    let msg = {
        tweet_id: req.params.tweet_id,
        route: "get_tweet_replies"
    }

    kafka.make_request("tweets", msg, function (err, results) {
        if (err) {
            console.log("-------error: tweet:get_replies/:id---------");
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });

});

router.get("/:user_id/liked", async (req, res) => {
    let msg = {
        user_id: req.params.user_id,
        route: "get_user_likes"
    }

    kafka.make_request("tweets", msg, function (err, results) {
        if (err) {
            console.log("-------error: tweet:get_user_likes/:id---------");
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });

});

module.exports = router;