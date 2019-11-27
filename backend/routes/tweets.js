const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { validateTweet, validateLikes, validateReplies } = require("../validations/tweetValidations");
const { STATUS_CODE } = require("../utils/constants");
const uploadFileToS3 = require('../utils/awsImageUpload');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }

})
const upload = multer({ storage });
express().use(express.static('public'));

/**
 * To get all the tweets of a user
 */
router.get("/user/:user_id/:page_number", async (req, res) => {
    let msg = {
        user_id: req.params.user_id,
        page_number: req.params.page_number,
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

/**
 * To get all the tweets of the followers of a user
 */
router.get("/following/:user_id", async (req, res) => {
    let msg = {
        user_id: req.params.user_id,
        route: "get_followers_tweets"
    }

    kafka.make_request("tweets", msg, function (err, results) {
        if (err) {
            console.log("-------error: tweet:get_followers_tweets/:id---------");
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });

});

/**
 * Post a tweet
 * @param req: user_id,tweet_text
 */
router.post("/", upload.any(), async (req, res) => {
    const { error } = validateTweet(req.body);
    if (error) {
        console.log("-------error: tweet:post/---------");
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }
    let msg = req.body;
    msg.tweet_image = new Array();
    if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
            // Need Tweet Id here
            try {
                let data = new Date(Date.now()).toString();
                let resp = await uploadFileToS3(req.files[i], 'tweet/' + data, msg.user_id);
                msg.tweet_image[i] = resp.Location;
            } catch (error) {
                console.log(error);
            }
        }
    }
    let rx = /(?:^|\s)(#[a-z0-9]\w*)/gi;
    var m, result = [];
    while (m = rx.exec(req.body.tweet_text)) {
        result.push(m[1]);
    }
    console.log(result);
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
 * To delete a tweet
 * @param req: user_id, tweet_id
 */
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

/**
 * To get all likes in a tweet
 */
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

/**
 * To get all the replies posted by a user
 */
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

/**
 * To get all the likes done by a user
 */
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