const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/fileupload");

const adminController = require("../controllers/adminController");

// admin registration
router.post("/register/admin", adminController.register_admin);

//admin login
router.post("/login/admin", adminController.login_admin);

//admin details
router.get("/admin/:id", auth.verify_admin, adminController.admin_details);

//update admin
router.put("/update/admin", auth.verify_admin, adminController.update_admin);

//user details
router.get(
  "/requestDetails/:id",
  auth.verify_admin,
  adminController.user_details
);

router.put(
  "/admin/profile-pic",
  auth.verify_admin,
  upload.single("file"),
  adminController.update_admin_profile
);

module.exports = router;
