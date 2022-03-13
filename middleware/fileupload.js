/* 
    This is for the file or image upload

*/

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files"); //saving folder name
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); //Date.now() gives us current date so that we can have unique name for image
  },
});

const filter = function (req, file, cb) {
  if (
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg"
  ) {
    //uploads only jpg, jpeg and png image format
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filter,
});

module.exports = upload;
