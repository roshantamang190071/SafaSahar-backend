const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/fileupload");

const userController = require("../controllers/userController");

// user registration
router.post("/register/user", userController.register_user);

//user login
router.post("/login/user", userController.login_user);

//user details
router.get("/user/:id", auth.verify_user, userController.user_details);

//update user
router.put("/update/user", auth.verify_user, userController.update_user);

router.put(
  "/user/profile-pic",
  auth.verify_user,
  upload.single("image"),
  userController.update_user_profile
);

module.exports = router;
