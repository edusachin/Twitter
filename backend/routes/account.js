"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const pool = require('../utils/mysqlConnection');
const { checkAuth } = require("../utils/passport");
const { validateAccount } = require("../validations/accountValidations");
const { STATUS_CODE, MESSAGES } = require('../utils/constants');

/**
 * to deactivate an account
 * @param req: user_id
 */
router.post("/deactivate", async (req, res) => {
    const { error } = validateAccount(req.body);
    if (error) {
        return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }
    let msg = req.body;
    msg.route = "deactivate_account";

    kafka.make_request("account", msg, function (err, results) {
        if (err) {
            return res.status(err.status).send(err.data);
        }
        else {
            return res.status(results.status).send(results.data);
        }
    });
});

router.post("/delete", async (req, res) => {
    const { error } = validateAccount(req.body);
    if (error) {
        return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    }
    let msg = req.body;
    msg.route = "delete_account";

    kafka.make_request("account", msg, function (err, results) {
        if (err) {
            return res.status(err.status).send(err.data);
        }
        else {
            if (results.status === 200) {
                let user_id = req.body.user_id;
                let sql = `CALL User_delete('${user_id}');`
                pool.query(sql, (err, sqlResult) => {
                    if (err) {
                        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(MESSAGES.INTERNAL_SERVER_ERROR);
                    }
                    if (sqlResult && sqlResult.length > 0 && sqlResult[0][0].status === 'USER_DELETED') {
                        return res.status(STATUS_CODE.SUCCESS).send(MESSAGES.SUCCESS);
                    } else {
                        return res.status(STATUS_CODE.BAD_REQUEST).send(sqlResult[0][0].status);
                    }
                });
            }
        }
    });
});

module.exports = router;