"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");
const { validateFollow } = require("../validations/followValidations");
const { STATUS_CODE } = require('../utils/constants');

router.post("/", async (req, res) => {
    const { error } = validateFollow(req.body);
    if (error) {
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }
    let msg = req.body;
    msg.route = "follow_user";

    kafka.make_request("follow", msg, function (err, results) {
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
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }
    let msg = req.body
    msg.route = "unfollow_user";
    
    kafka.make_request("follow", msg, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

router.get("/followers/:user_id", async (req, res) => {
    let msg = {};
    msg.route = "get_followers";
    msg.user_id = req.params.user_id;
    
    kafka.make_request("follow", msg, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

router.get("/following/:user_id", async (req, res) => {
    let msg = {};
    msg.route = "get_following";
    msg.user_id = req.params.user_id;
    
    kafka.make_request("follow", msg, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

module.exports = router;