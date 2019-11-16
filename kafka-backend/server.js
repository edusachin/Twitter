"use strict";
var connection = new require("./kafka/connection");
var connectMongoDB = require("./utils/dbConnection");

//import topics files
const signupService = require("./services/signup");
const profileService = require("./services/profile");
const followService = require("./services/follow");
const messageService = require("./services/messages");

//MongoDB connection
connectMongoDB();

//Handle topic request
const handleTopicRequest = (topic_name, fname) => {
  var consumers = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  var i;
  for (i = 0; i < consumers.length; i++) {
    var consumer = consumers[i];
    consumer.on("message", function (message) {
      console.log("Message received for " + topic_name);
      var data = JSON.parse(message.value);
      fname.handle_request(data.data, (err, res) => {
        response(data, res, err, producer);
        return;
      });
    });
  }
};

const response = (data, res, err, producer) => {
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
      console.log("Error when producer sending data", err);
    } else {
      console.log(data);
    }
  });
  return;
}

// Topics
handleTopicRequest("signup", signupService);
handleTopicRequest("profile", profileService);
handleTopicRequest("follow", followService);
handleTopicRequest("messages", messageService);