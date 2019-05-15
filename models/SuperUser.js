const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create SuperUser Schema
const SuperUser = new Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = SuperUser = mongoose.model("superUsers", PartySchema);
