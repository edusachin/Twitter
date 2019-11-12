const express = require("express");
const router = express.Router();
const { secret } = require('../utils/config');
const jwt = require("jsonwebtoken");
const { auth } = require("../utils/passport");
auth();
const kafka = require("../kafka/client");
const { validateLogin } = require("../validations/loginValidations");

//Login API
router.post("/", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error)
    res.status(400).send(error.details[0].message);

  kafka.make_request("login", req.body, function(err, results) {
    if (err) {
      res.status(err.status).send(err.message);
    }
    else if (results.status === 200) {
      let payload = results.message;
      var token = jwt.sign(payload, secret, {
        expiresIn: 1008000
      });
      res.json({ success: true, token: 'JWT ' + token });
    }
    else {
      res.status(results.status).end(results.data);
    }
  });
});

module.exports = router;
