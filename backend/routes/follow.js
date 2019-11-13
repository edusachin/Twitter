const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { validateFollow } = require("../validations/followValidations");

router.post("/", async (req, res) => {
    const { error } = validateFollow(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    req.body.route = "follow_user";

    kafka.make_request("follow", req.body, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

router.post("/unfollow", async (req, res) => {
    const { error } = validateFollow(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    req.body.route = "unfollow_user";
    
    kafka.make_request("follow", req.body, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

router.get("/followers/:user_id", async (req, res) => {
    req.body.route = "get_followers";
    req.body.user_id = req.params.user_id;
    
    kafka.make_request("follow", req.body, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

router.get("/following/:user_id", async (req, res) => {
    req.body.route = "get_following";
    req.body.user_id = req.params.user_id;
    
    kafka.make_request("follow", req.body, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

module.exports = router;