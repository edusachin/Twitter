"use strict";
const config = {
   secret: "cmpe273_kafka_passport_mongo",
   frontendURI: "http://localhost:3000",
   kafkaURI: "184.72.81.222:9092,54.144.192.115:9092,54.86.72.238:9092",
   // Start 3 servers on local on diff ports for local setup
   //kafkaURI: "localhost:9092,locahost:9093,localhost:9094",
   mysqlUser: "root",
   mysqlPassword: "cmpepassword",
   mysqlHost: "cmpedatabase.cxwydwkipclw.us-east-1.rds.amazonaws.com",
   mysqlDatabase: "twitter",
   awsBucket: "cmpe273twitter",
   // Keys can't be added here because AWS categorizes this as vulnerability.
   awsAccessKey: "AKIAIGYDUOPCKMVQ57WA",
   awsSecretAccessKey: "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",
   awsPermission: "public-read"
};

module.exports = config;