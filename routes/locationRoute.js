const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const locationController = require("../controllers/locationController");

// add location
router.post("/add-location", auth.verify_user, locationController.add_location);
//router.post("/add-location", locationController.add_location);

//get all location
router.get(
  "/get-all-location",
  auth.verify_admin,
  locationController.get_all_location
);

//get single location
router.get(
  "/get-single-location/:id",
  auth.verify_admin,
  locationController.get_single_location
);

//delete location
//router.delete("/delete-location", locationController.delete_location);

module.exports = router;
