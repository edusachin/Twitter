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

module.exports = router;