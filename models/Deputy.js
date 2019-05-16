const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Deputy Schema
const DeputySchema = new Schema({
  name: {
    type: String,
    index: true
  },
  participationRate: {
    type: Number
  },
  mandateFrom: {
    type: Date
  },
  mandateTo: {
    type: Date
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "groups"
  },
  party: {
    type: Schema.Types.ObjectId,
    ref: "parties"
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

module.exports = Deputy = mongoose.model("deputies", DeputySchema);
