const express = require("express");
const router = express.Router();
var kafka = require("../kafka/client");

const {
  validateUser,
  validateRestaurant
} = require("../validations/signupValidations");

//Customer sign up API
router.post("/customer", (req, res) => {
  console.log("Inside Customer signup Post Request");
  console.log("Req Body : ", req.body);

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const body = req.body;

  kafka.make_request("signup_topic", { type: "customer", req: body }, function(
    err,
    results
  ) {
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

//Restaurant Sign Up API
router.post("/restaurant", (req, res) => {
  console.log("Inside restaurant signup Post Request");
  console.log("Req Body : ", req.body);

  const { error } = validateRestaurant(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const body = req.body;

  kafka.make_request(
    "signup_topic",
    { type: "restaurant", req: body },
    function(err, results) {
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
    }
  );
});

module.exports = router;
