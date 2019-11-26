"use strict";
const config = {
   secret: "cmpe273_kafka_passport_mongo",
   frontendURI: "http://localhost:3000",
   kafkaURI: "localhost:2181",
   mysqlUser: "root",
   mysqlPassword: "cmpepassword",
   mysqlHost: "cmpedatabase.cxwydwkipclw.us-east-1.rds.amazonaws.com",
   mysqlDatabase: "twitter",
   awsBucket: "cmpe273twitter",
   awsAccessKey: "AKIAISPOF2TXR2WO3WYA",
   awsSecretAccessKey: "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",
   awsPermission: "public-read"
};

module.exports = config;