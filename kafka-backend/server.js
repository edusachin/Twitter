var connection = new require("./kafka/connection");
var connectDB = require("./config/dbConnection");
//topics files
const loginService = require("./services/login/loginService");
const authService = require("./services/passport/authService");
const signupService = require("./services/signup/signupService");
//const menuItemService = require("./services/menuItems/menuItemService");

//MongoDB connection
connectDB();

//Handle topic request
function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    switch (topic_name) {
      //upload topic
      case "auth_topic":
        authService.handle_request(data.data, function (err, res) {
          response(data, res, err, producer);
          return;
        });
        break;

      //login topic
      case "login_topic":
        loginService.handle_request(data.data, function (err, res) {
          response(data, res, err, producer);
          return;
        });
        break;

      //signup topic
      case "signup_topic":
        signupService.handle_request(data.data, function (err, res) {
          response(data, res, err, producer);
          return;
        });
        break;

      //menuItem topic
      case "menuItem_topic":
        menuItemService.handle_request(data.data, function (err, res) {
          response(data, res, err, producer);
          return;
        });
        break;
    }
  });
}

function response(data, res, err, producer) {
  console.log("after handle " + res);

  console.log("after handle " + err);
  var payloads = [
    {
      topic: data.replyTo,
      messages: JSON.stringify({
        correlationId: data.correlationId,
        data: res,
        err: err
      }),
      partition: 0
    }
  ];
  producer.send(payloads, function (err, data) {
    if (err) {
      console.log("error when producer sending data", err);
    } else {
      console.log("producer send", data);
    }
  });
  return;
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
// handleTopicRequest("auth_topic", authService);
// handleTopicRequest("login_topic", loginService);
// handleTopicRequest("signup_topic", signupService);
// handleTopicRequest("menuItem_topic", menuItemService);