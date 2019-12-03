"use strict";
module.exports = {
  mongoDBURI: "mongodb+srv://admin:CMPE273@twitter-ftl7l.mongodb.net/twitter?retryWrites=true&w=majority",
  kafkaURI: "3.82.252.69:9092,54.197.8.135:9092,3.82.218.63:9092",
  // Start 3 brokers on local on diff ports for local setup
  //kafkaURI: "localhost:9092,locahost:9093,localhost:9094",
  redisPort: 6379,
  //redisHost: "localhost" // Use this for local redis
  redisHost: "54.173.125.207"
};
