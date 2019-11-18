"use strict";
const kafka = require("kafka-node");
const { kafkaURI } = require("../utils/config");

function ConnectionProvider() {
  this.getConsumer = function(topic_name) {
    var options = {
      // connect directly to kafka broker (instantiates a KafkaClient)
      kafkaHost: kafkaURI,
      groupId: topic_name,
      autoCommit: true,
      autoCommitIntervalMs: 5000,
      sessionTimeout: 15000,
      fetchMaxBytes: 10 * 1024 * 1024, // 10 MB
      // An array of partition assignment protocols ordered by preference. 'roundrobin' or 'range' string for
      // built ins (see below to pass in custom assignment protocol)
      protocol: ['roundrobin'],
      // Offsets to use for new groups other options could be 'earliest' or 'none'
      // (none will emit an error if no offsets were saved) equivalent to Java client's auto.offset.reset
      fromOffset: 'latest',
      // how to recover from OutOfRangeOffset error (where save offset is past server retention)
      // accepts same value as fromOffset
      outOfRangeOffset: 'earliest'
    };
    var consumer = new kafka.ConsumerGroup(options, topic_name);
    return consumer;
  };

  this.getProducer = function() {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.KafkaClient({ kafkaHost: kafkaURI });
      var HighLevelProducer = kafka.HighLevelProducer;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      console.log("Producer ready");
    }
    return this.kafkaProducerConnection;
  };
}
exports = module.exports = new ConnectionProvider();
