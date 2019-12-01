"use strict";
module.exports = {
  mongoDBURI: "mongodb+srv://admin:CMPE273@twitter-ftl7l.mongodb.net/twitter?retryWrites=true&w=majority",
  kafkaURI: "184.72.81.222:9092,54.144.192.115:9092,54.86.72.238:9092",
  // Start 3 brokers on local on diff ports for local setup
  //kafkaURI: "localhost:9092,locahost:9093,localhost:9094",
  redisPort: 6379,
  //redisHost: "localhost" // Use this for local redis
  redisHost: "3.84.89.16"
};
