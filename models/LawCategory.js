const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create LawCategory Schema
const LawCategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    max: 300
  },
  laws: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "laws"
  }
});

module.exports = LawCategory = mongoose.model(
  "lawCategories",
  LawCategorySchema
);
