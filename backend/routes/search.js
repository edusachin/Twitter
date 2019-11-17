"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");

router.get("/user/:input", checkAuth, async (req, res) => {
    let msg = {};
    msg.route = "search_users";
    msg.input = req.params.input;
    
    kafka.make_request("search", msg, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

router.get("/tweet/:input", checkAuth, async (req, res) => {
    let msg = {};
    msg.route = "search_tweets";
    msg.input = req.params.input;
    
    kafka.make_request("search", msg, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

module.exports = router;