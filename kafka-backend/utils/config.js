"use strict";
module.exports = {
  mongoDBURI: "mongodb+srv://admin:CMPE273@twitter-ftl7l.mongodb.net/twitter?retryWrites=true&w=majority",
  kafkaURI: "3.80.153.32:9092,34.230.40.10:9092,54.175.21.173:9092",
  // Start 3 brokers on local on diff ports for local setup
  //kafkaURI: "localhost:9092,locahost:9093,localhost:9094",
  redisPort: 6379,
  //redisHost: "localhost" // Use this for local redis
  redisHost: "52.90.111.80"
};
