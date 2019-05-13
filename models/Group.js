const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Group Schema
const GroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  slug: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Group = mongoose.model("groups", GroupSchema);
