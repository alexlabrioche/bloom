const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create LawCategory Schema
const LawCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    inde: true
  },
  description: {
    type: String
  },
  laws: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "laws"
    }
  ],
  slug: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = LawCategory = mongoose.model(
  "lawCategories",
  LawCategorySchema
);
