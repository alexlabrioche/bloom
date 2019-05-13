const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Deputy Schema
const DeputySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  participationRate: {
    type: Number
  },
  mandate: {
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date,
      required: true
    }
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
    type: String,
    required: true
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
