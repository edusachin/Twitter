const express = require("express");
const router = express.Router();
var kafka = require("../kafka/client");
const { validateLogin } = require("../validations/loginValidations");

//Login API
router.post("/", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  kafka.make_request("login_topic", req.body, function(err, results) {
    console.log("in make request call back");
    console.log(results);
    console.log(err);
    if (err) {
      console.log("Inside err");
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      console.log("Inside else");
      console.log(results);
      return res.status(results.status).send(results.data);
    }
  });
});

module.exports = router;
