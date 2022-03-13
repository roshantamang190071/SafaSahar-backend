const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
const admin = require("../models/adminModel");

//create a main guard
module.exports.verify_user = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "token");
    user
      .findOne({ _id: data.userID })
      .then(function (result) {
        req.userData = result;
        next();
      })
      .catch(function (e) {
        res.status(401).json({ error: e });
      });
  } catch (e) {
    res.status(401).json({ error: e });
  }
};

// creating a mini guard
module.exports.verify_admin = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "token");
    admin
      .findOne({ _id: data.adminID })
      .then(function (result) {
        req.adminData = result;
        next();
      })
      .catch(function (e) {
        res.status(401).json({ error: e });
      });
  } catch (e) {
    res.status(401).json({ error: e });
  }
};
