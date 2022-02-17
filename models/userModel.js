const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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

const user = mongoose.model("User", userSchema);

module.exports = user;
