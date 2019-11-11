const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 500,
    bufferMaxEntries: 0
  };

const mongoDB = "mongodb+srv://admin:CMPE273@twitter-ftl7l.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

module.exports = mongoose;