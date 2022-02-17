const express = require("express");
const router = new express.Router();

const adminModel = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// admin registration
router.post("/register/admin", function (req, res) {
  const email = req.body.email;
  const fullName = req.body.fullName;
  const password = req.body.password;
  const address = req.body.address;
  const phoneNumber = req.body.phoneNumber;

  adminModel
    .findOne({ email: email })
    .then(function (admin_data) {
      if (admin_data != null) {
        console.log("admin already exists");
        return res
          .status(403)
          .json({ success: false, message: "E-mail already in use!" });
      }

      //password encryption
      bcrypt.hash(password, 10, function (err, hash) {
        var data = new adminModel({
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

//admin login
router.post("/login/admin", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  // admin validation
  adminModel
    .findOne({ email: email })
    .then(function (admin_data) {
      if (admin_data == null) {
        return res.status(403).json({ message: "Invalid Login!" });
      }
      // parameters(body.password, database.password )
      bcrypt.compare(password, admin_data.password, function (err, result) {
        if (result === false) {
          return res.status(403).json({ message: "Invalid Login!" });
        }
        //generate token
        const token = jwt.sign({ adminID: admin_data._id }, "zQB45Sd134_admin"); //zQB45Sd134 = secret key
        res.status(200).json({
          success: true,
          data: admin_data._id,
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
