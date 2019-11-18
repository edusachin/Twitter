"use strict";
const config = {
   secret: "cmpe273_kafka_passport_mongo",
   frontendURI: "http://localhost:3000",
   kafkaURI: "3.80.153.32:9092,34.230.40.10:9092,54.175.21.173:9092",
   // Start 3 servers on local on diff ports for local setup
   //kafkaURI: "localhost:9092,locahost:9093,localhost:9094",
   mysqlUser: "root",
   mysqlPassword: "cmpepassword",
   mysqlHost: "cmpedatabase.cxwydwkipclw.us-east-1.rds.amazonaws.com",
   mysqlDatabase: "twitter"
};

module.exports = config;