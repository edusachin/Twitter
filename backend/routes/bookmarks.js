"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");
const { validateBookmark, validateClearBookmark } = require("../validations/bookmarkValidation");
const { STATUS_CODE } = require('../utils/constants');

router.post("/", async (req, res) => {
    const { error } = validateBookmark(req.body);
    if (error) {
        return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }
    let msg = req.body;
    msg.route = "add_bookmark";

    kafka.make_request("bookmarks", msg, function (err, results) {
        if (err) {
            return res.status(err.status).send(err.data);
        }
        else {
            return res.status(results.status).send(results.data);
        }
    });
});


router.get("/:user_id", async (req, res) => {
    let msg = {};
    msg.route = "get_bookmarks";
    msg.user_id = req.params.user_id;
    
    kafka.make_request("bookmarks", msg, function (err, results) {
        if (err) {
            return res.status(err.status).send(err.data);
        }
        else {
            return res.status(results.status).send(results.data);
        }
    });
});

//Deletes single bookmark
router.post("/delete", async (req, res) => {
    const { error } = validateBookmark(req.body);
    if (error) {
        return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }
    let msg = req.body;
    msg.route = "delete_bookmark";

    kafka.make_request("bookmarks", msg, function (err, results) {
        if (err) {
            return res.status(err.status).send(err.data);
        }
        else {
            return res.status(results.status).send(results.data);
        }
    });
});

//Clears entire bookmarks array
router.post("/clear", async (req, res) => {
    const { error } = validateClearBookmark(req.body);
    if (error) {
        return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }
    let msg = req.body;
    msg.route = "clear_bookmarks";

    kafka.make_request("bookmarks", msg, function (err, results) {
        if (err) {
            return res.status(err.status).send(err.data);
        }
        else {
            return res.status(results.status).send(results.data);
        }
    });
});



module.exports = router;