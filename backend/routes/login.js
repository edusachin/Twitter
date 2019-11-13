const express = require("express");
const router = express.Router();
const { auth } = require("../utils/passport");
auth();
const kafka = require("../kafka/client");
const { validateLogin } = require("../validations/loginValidations");

router.post("/", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error)
    res.status(400).send(error.details[0].message);

  kafka.make_request("login", req.body, function(err, results) {
    if (err) {
      res.status(err.status).send(err.data);
    }
    else {
      res.status(results.status).send(results.data);
    }
  });
});

module.exports = router;
