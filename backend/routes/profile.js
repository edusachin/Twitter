const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");
const { validateProfile } = require("../validations/profileValidations");

router.get("/:user_id", async (req, res) => {
    req.body.route = "get_profile";
    req.body.user_id = req.params.user_id;

    kafka.make_request("profile", req.body, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

router.post("/", async (req, res) => {
    const { error } = validateProfile(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    req.body.route = "update_profile";
    kafka.make_request("profile", req.body, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

module.exports = router;