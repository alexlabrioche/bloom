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
    type: Date
  },
  resume: {
    type: String
  },
  fullText: {
    type: String
  },
  link: {
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

module.exports = Law = mongoose.model("laws", LawSchema);
