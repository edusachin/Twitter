"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");
const { validateMessage } = require("../validations/messageValidations");
const { STATUS_CODE } = require('../utils/constants');

router.post("/", async (req, res) => {
    const { error } = validateMessage(req.body);
    if (error) {
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }
    let msg = req.body;
    msg.route = "send_message";

    kafka.make_request("messages", msg, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});


router.get("/:user_id", async (req, res) => {
    let msg = {};
    msg.route = "get_conversations";
    msg.user_id = req.params.user_id;
    
    kafka.make_request("messages", msg, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});


router.get("/searched/:user_id/:target_id", async (req, res) => {
    let msg = {};
    msg.route = "get_SearchedConversation";
    msg.user_id = req.params.user_id;
    msg.target_id = req.params.target_id;
    
    kafka.make_request("messages", msg, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

router.get("/single/:user_id/:conversation_id", async (req, res) => {
    let msg = {};
    msg.route = "get_single_conversation";
    msg.conversation_id = req.params.conversation_id;
    msg.user_id = req.params.user_id;
    kafka.make_request("messages", msg, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

module.exports = router;