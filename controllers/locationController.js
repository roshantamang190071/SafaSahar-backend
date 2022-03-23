const location = require("../models/locationModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.add_location = async function (req, res) {
  //get date in readable format
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0"); //day
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  var date1 = dd + "/" + mm + "/" + yyyy + " " + formatAMPM(new Date());

  console.log(req.userData._id);

  const latitude = req.body.longitude;
  const longitude = req.body.longitude;
  const userId = req.userData._id;
  const date = date1;
  const address = req.body.address;

  const location1 = new location({
    latitude: latitude,
    longitude: longitude,
    userId: userId,
    date: date,
    address: address,
  });
  await location1.save();
  res.json({ msg: "Location added", success: true });
};

// get all location
module.exports.get_all_location = async function (req, res) {
  const data = await location.find();
  res.json({ msg: "All locations fetched", success: true, data });
};

// get single location
module.exports.get_single_location = async function (req, res) {
  try {
    const locationId = req.params.locationId;

    const data = await location.findById(locationId);

    res.json({
      msg: "Single location data Fetched",
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: `Error Occured ${error}` });
  }
};
