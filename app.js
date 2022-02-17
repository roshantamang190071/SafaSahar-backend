const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

//imprt database connection
require("./dbConnection/dbConnection");

//import routes
const user = require("./routes/userRoute");
const admin = require("./routes/adminRoute");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(user);
app.use(admin);

app.listen(3000, function (error) {
  if (error) {
    console.log("Could not listen at port:3000!");
  } else {
    console.log("Listening at port:3000!");
  }
});
