const express = require("express");
const router = express.Router();
var kafka = require("../kafka/client");

const { auth, checkAuth } = require("../utils/passport");
auth();

const {
  validateMenuItem,
  validateMenuItemUpdate,
  validateMenuItemDelete
} = require("../validations/menuitemsValidations");

//GET Menu Items owner id
router.get("/:user_id", checkAuth, (req, res) => {
  const body = {};
  body.user_id = req.params.user_id;

  kafka.make_request("menuItem_topic", { type: "get", req: body }, function (
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

//INSERT Menu Items
router.post("/insert", checkAuth, (req, res) => {
  console.log(req.body);
  const { error } = validateMenuItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const body = req.body;

  kafka.make_request("menuItem_topic", { type: "insert", req: body }, function (
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

//UPDATE Menu Items
router.post("/update", checkAuth, (req, res) => {
  console.log(req.body);
  const { error } = validateMenuItemUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const body = req.body;

  kafka.make_request("menuItem_topic", { type: "update", req: body }, function (
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
// index = await User.aggregate([
//   { $match: { _id: ObjectId(req.body.user_id) } },
//   {
//     $project: {
//       index: {
//         $indexOfArray: [
//           "$restaurant.menu_sections.menu_section_name",
//           req.body.menu_section_name
//         ]
//       },
//       _id: 0
//     }
//   }
// ]);

// // console.log(index[0].index);
// if (!index) return res.status(400).send("Section does not exist");

//DELETE Menu Items
router.post("/delete", checkAuth, (req, res) => {
  console.log(req.body);
  const { error } = validateMenuItemDelete(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const body = req.body;

  kafka.make_request("menuItem_topic", { type: "delete", req: body }, function (
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

module.exports = router;
