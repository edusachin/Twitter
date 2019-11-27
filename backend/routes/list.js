const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");
const { validateCreateList, validateUpdateList, validateDeleteList, validateAddToList, validateRemoveFromList } = require("../validations/listValidations");

//GET user lists
router.get("/:user_id/:getType", (req, res) => {
    const msg = {};
    console.log(req.params);
    msg.user_id = req.params.user_id;
    msg.route = "get_user_lists";
    msg.type = req.params.getType;

    kafka.make_request("list", msg, function (err, results) {

        console.log("in make request call back");
        // console.log(results);
        // console.log(err);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.data);
        } else {
            console.log("Inside else");
            return res.status(results.status).send(results.data);
        }
    });
});

//Create user lists
router.post("/create", (req, res) => {

    const { error } = validateCreateList(req.body);
    if (error) {
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }

    const msg = req.body;
    msg.route = "create_list";

    kafka.make_request("list", msg, function (err, results) {
        console.log("in make request call back");
        console.log(results);
        console.log(err);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.data);
        } else {
            console.log("Inside else");
            console.log(results);
            return res.status(results.status).send(results.data);
        }
    });
});

//Update user lists
router.post("/update", (req, res) => {

    const { error } = validateUpdateList(req.body);
    if (error) {
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }

    const msg = req.body;
    msg.route = "update_list";

    kafka.make_request("list", msg, function (err, results) {
        console.log("in make request call back");
        console.log(results);
        console.log(err);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.data);
        } else {
            console.log("Inside else");
            console.log(results);
            return res.status(results.status).send(results.data);
        }
    });
});


//Delete user lists
router.post("/delete", (req, res) => {

    const { error } = validateDeleteList(req.body);
    if (error) {
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }

    const msg = req.body;
    msg.route = "delete_list";

    kafka.make_request("list", msg, function (err, results) {
        console.log("in make request call back");
        console.log(results);
        console.log(err);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.data);
        } else {
            console.log("Inside else");
            console.log(results);
            return res.status(results.status).send(results.data);
        }
    });
});

//Add member/subscriber list
router.post("/add", (req, res) => {

    const { error } = validateAddToList(req.body);
    if (error) {
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }

    const msg = req.body;
    msg.route = "add_to_list";

    kafka.make_request("list", msg, function (err, results) {
        console.log("in make request call back");
        console.log(results);
        console.log(err);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.data);
        } else {
            console.log("Inside else");
            console.log(results);
            return res.status(results.status).send(results.data);
        }
    });
});

//Remove member/subscriber list
router.post("/remove", (req, res) => {

    const { error } = validateRemoveFromList(req.body);
    if (error) {
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }

    const msg = req.body;
    msg.route = "remove_from_list";

    kafka.make_request("list", msg, function (err, results) {
        console.log("in make request call back");
        console.log(results);
        console.log(err);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.data);
        } else {
            console.log("Inside else");
            console.log(results);
            return res.status(results.status).send(results.data);
        }
    });
});

module.exports = router;