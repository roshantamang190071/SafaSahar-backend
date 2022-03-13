const user = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register_user = async function (req, res) {
  const fullName = req.body.fullName;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;

  await user
    .findOne({ phoneNumber: phoneNumber })
    .then(function (user_data) {
      if (user_data != null) {
        console.log("user already exists");
        return res
          .status(403)
          .json({ success: false, message: "User already exists!" });
      }

      //password encryption
      bcrypt.hash(password, 10, function (err, hash) {
        var data = new user({
          fullName: fullName,
          password: hash,
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
};

module.exports.login_user = async function (req, res) {
  const phoneNumber = await req.body.phoneNumber;

  // user validation
  await user
    .findOne({ phoneNumber: phoneNumber })
    .then(function (user_data) {
      if (user_data == null) {
        return res.status(403).json({ message: "Invalid Login!" });
      }
      // parameters(body.password, database.password )
      bcrypt.compare(
        req.body.password,
        user_data.password,
        function (err, result) {
          if (result === false) {
            return res.status(403).json({ message: "Invalid Login!" });
          }
          //generate token
          const token = jwt.sign({ userID: user_data._id }, "token"); //zQB45Sd134 = secret key
          res.status(200).json({
            success: true,
            data: user_data._id,
            token: token,
            message: "Auth Success!",
          });
        }
      );
    })
    .catch(function (e) {
      res.status(500).json({ message: e });
    });
};

module.exports.user_details = async function (req, res) {
  const _id = req.params.id;
  await user
    .findById(_id)
    .then((data) => {
      return res
        .status(200)
        .json({ success: true, msg: "Successfully fetched User Data", data });
    })
    .catch((err) => {
      return res.status(500).json({ success: false, message: err });
    });
};

module.exports.update_user = async function (req, res) {
  const update = {
    $set: {
      fullName: req.body.fullName,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
    },
  };
  const option = {
    returnNewDocument: false,
  };

  await user.updateOne({ _id: req.userData._id }, update, option); // (query, update, option)
  return res
    .status(201)
    .json({ success: true, message: "Successully updated!" });
};

module.exports.update_user_profile = async function (req, res) {
  console.log(req.file);
  if (req.file == undefined) {
    return res.json({ msg: "only png/jpeg/gif files are allowed!" });
  }
  const filename = req.file.filename;
  const user1 = req.userData;
  await user.updateOne(
    { _id: user1._id },
    {
      profilePic: filename,
    }
  );
  return res.json({ msg: "User Profile Picture Uploaded", success: true });
};
