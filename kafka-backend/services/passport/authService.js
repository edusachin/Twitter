// //const { User } = require("../../models/userModel");

// async function handle_request(req, callback) {
//   console.log("Inside received reply in kafka backend");
//   let response = {};
//   let err = {};

//   User.findOne({ _id: req._id }, function(error, user) {
//     if (error) {
//       console.log("-------inside passport error-------");
//       console.log(error);
//       err.boolean = false;
//       err.data = error;
//       return callback(err, null);
//     } else {
//       if (user) {
//         console.log("-------inside passport user-------");
//         console.log(user);
//         response.boolean = null;
//         response.data = user;
//         return callback(null, response);
//       } else {
//         response.boolean = null;
//         response.data = false;
//         return callback(null, response);
//       }
//     }
//   });
// }

// exports.handle_request = handle_request;
