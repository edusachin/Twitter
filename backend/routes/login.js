"use strict";
const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const pool = require('../utils/mysqlConnection');
const { secret } = require('../utils/config');
const { STATUS_CODE, MESSAGES } = require('../utils/constants');
const { validateLogin } = require("../validations/loginValidations");
const { auth } = require("../utils/passport");
auth();

router.post("/", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error)
    res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);

  let sql = `CALL Password_get('${req.body.email_id}');`;
  pool.query(sql, (err, sqlResult) => {
    if (err) {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(MESSAGES.INTERNAL_SERVER_ERROR);
    }
    if (sqlResult && sqlResult.length > 0 && sqlResult[0][0]) {
      if (passwordHash.verify(req.body.password, sqlResult[0][0].password)) {
        const payload = {
          email_id: req.body.email_id
        };
        const token = jwt.sign(payload, secret, {
          expiresIn: 900000 // in seconds
        });
        res.status(STATUS_CODE.SUCCESS).send(token);
      }
      else {
        res.status(STATUS_CODE.UNAUTHORIZED).send(MESSAGES.INVALID_CREDENTIALS);
      }
    }
  });
});

module.exports = router;
