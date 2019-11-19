"use strict";
var kafka = require("kafka-node");
const { kafkaURI } = require("../utils/config");

function ConnectionProvider() {
  this.getConsumer = function (topic_name) {
    var options = {
      kafkaHost: kafkaURI,
      groupId: topic_name,
      autoCommit: true,
      autoCommitIntervalMs: 5000,
      sessionTimeout: 15000,
      fetchMaxBytes: 10 * 1024 * 1024, // 10 MB
      protocol: ['roundrobin'],
      fromOffset: 'latest',
      outOfRangeOffset: 'earliest'
    };
    var consumer = new kafka.ConsumerGroup(options, topic_name);
    return consumer;
  };

  //Code will be executed when we start Producer
  this.getProducer = function () {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.KafkaClient({ kafkaHost: kafkaURI });
      var HighLevelProducer = kafka.HighLevelProducer;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      console.log("Producer ready!");
    }
    return this.kafkaProducerConnection;
  };
}

exports = module.exports = new ConnectionProvider();
