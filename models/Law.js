const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Law Schema
const LawSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  subTitle: {
    type: String
  },
  protect: {
    type: Boolean,
    required: true
  },
  commencement: {
    type: Date,
    required: true
  },
  resume: {
    type: String,
    max: 300
  },
  fullText: {
    type: String,
    max: 600
  },
  link: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Law = mongoose.model("laws", LawSchema);
