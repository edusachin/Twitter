const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { validateTweet } = require("../validations/tweetValidations");

router.post("/", async (req, res) => {
    const { error } = validateTweet(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    let msg = req.body;
    msg.route = "post_tweet";
    kafka.make_request("tweets", msg, function (err, results) {
        if (err) {
            console.log("-------in errrr---------");
            res.status(err.status).send(err.data);
        }
        else {
            console.log("-------in response---------");
            res.status(results.status).send(results.data);
        }
    });
});

module.exports = router;