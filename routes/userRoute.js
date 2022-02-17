const express = require("express");
const router = new express.Router();

const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// user registration
router.post("/register/user", function (req, res) {
  const email = req.body.email;
  const fullName = req.body.fullName;
  const password = req.body.password;
  const address = req.body.address;
  const phoneNumber = req.body.phoneNumber;

  userModel
    .findOne({ email: email })
    .then(function (user_data) {
      if (user_data != null) {
        console.log("user already exists");
        return res
          .status(403)
          .json({ success: false, message: "User already exists!" });
      }

      //password encryption
      bcrypt.hash(password, 10, function (err, hash) {
        var data = new userModel({
          email: email,
          fullName: fullName,
          password: hash,
          address: address,
          phoneNumber: phoneNumber,
        });

        //then catch error handling
        data
          .save()
          .then(function () {
            res
              .status(201)
              .json({ success: true, message: "Registration successful!" });
          })
          .catch(function (e) {
            res.status(500).json({ message: e });
          });
      });
    })
    .catch(function (e) {
      res.status(500).json({ message: e });
    });
});

//user login
router.post("/login/user", function (req, res) {
  const fullName = req.body.fullName;
  const password = req.body.password;

  // user validation
  userModel
    .findOne({ email: email })
    .then(function (user_data) {
      if (user_data == null) {
        return res.status(403).json({ message: "Invalid Login!" });
      }
      // parameters(body.password, database.password )
      bcrypt.compare(password, user_data.password, function (err, result) {
        if (result === false) {
          return res.status(403).json({ message: "Invalid Login!" });
        }
        //generate token
        const token = jwt.sign({ userID: user_data._id }, "zQB45Sd134_user"); //zQB45Sd134 = secret key
        res.status(200).json({
          success: true,
          data: user_data._id,
          token: token,
          message: "Auth Success!",
        });
      });
    })
    .catch(function (e) {
      res.status(500).json({ message: e });
    });
});

module.exports = router;
