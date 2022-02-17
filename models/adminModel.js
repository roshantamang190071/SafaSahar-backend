const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  fullName: {
    type: String,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  profilePic: {
    type: String,
  },
});

const admin = mongoose.model("Admin", adminSchema);

module.exports = admin;
