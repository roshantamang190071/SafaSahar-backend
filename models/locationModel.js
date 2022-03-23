const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String,
  },
  address: {
    type: String,
  },
});

const location = mongoose.model("Location", locationSchema);

module.exports = location;
