const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { validateLikes, validateReplies } = require("../validations/tweetValidations");
const { STATUS_CODE } = require("../utils/constants");

/**
 * To retweet a tweet
 * @param req:user_id, tweet_id
 */
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

/**
 * To post a reply on a tweet
 * @param req:  user_id,tweet_id
 */
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

/**
 * To post a reply on a tweet
 * @param req: user_id, tweet_id, reply_text
 */
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

module.exports = router;