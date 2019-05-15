const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

// Create SuperUser Schema
const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true
  }
});

AdminSchema.plugin(passportLocalMongoose);

module.exports = Admin = mongoose.model("admins", AdminSchema);
