"use strict";
const config = {
   secret: "cmpe273_kafka_passport_mongo",
   frontendURI: "http://localhost:3000",
   kafkaURI: "localhost:2181",
   mysqlUser: "root",
   mysqlPassword: "cmpetwitter",
   mysqlHost: "twitter.cxwydwkipclw.us-east-1.rds.amazonaws.com",
   mysqlDatabase: "twitter"
};

module.exports = config;