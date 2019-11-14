"use strict"
const mongoose = require("mongoose");
const schema = mongoose.Schema;

//Schema
const listSchema = new schema(
  {
    list_owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    list_description: {
      type: String,
      trim: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    subscribers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
  },
  { versionKey: false }
);

const List = mongoose.model("List", listSchema);

module.exports = List;