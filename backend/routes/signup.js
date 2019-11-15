"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const passwordHash = require('password-hash');
const pool = require('../utils/mysqlConnection');
const { validateUser } = require("../validations/signupValidations");
const { STATUS_CODE, MESSAGES } = require('../utils/constants');

router.post("/", async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }
    kafka.make_request("signup", req.body, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        }
        else {
            let hashedPassword = passwordHash.generate(req.body.password);
            let sql = `CALL User_put('${req.body.email_id}', '${hashedPassword}');`
            pool.query(sql, (err, sqlResult) => {
                if (err) {
                    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(MESSAGES.INTERNAL_SERVER_ERROR);
                }
                if (sqlResult && sqlResult.length > 0 && sqlResult[0][0].status === 'USER_ADDED') {
                    res.status(results.status).send(results.data);
                }
            });
        }
    });
});

module.exports = router;
