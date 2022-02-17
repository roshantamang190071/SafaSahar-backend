//to connect to database in MongoDB
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/safaSahar", function (error) {
  if (error) {
    console.log("Database error!");
  } else {
    console.log("Connected to database!");
  }
});
