const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { validateUser } = require("../validations/signupValidations");

//Signup API
router.post("/", async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    kafka.make_request("signup", req.body, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            res.status(results.status).send(results.data);
        }
    });
});

module.exports = router;
