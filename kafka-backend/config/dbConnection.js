const mongoose = require("mongoose");
const config = require("../config/config");

//Mongo Connection
const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      poolSize: 900,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("Could not connect to MongoDB", err);
  }
};

module.exports = connectDB;
