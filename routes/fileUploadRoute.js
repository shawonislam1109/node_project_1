const {
  fileUploadController,
  deleteProfilePics,
} = require("../controllers/uploadController");
const { isAuthenticated } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const route = require("express").Router();

route.post(
  "/upload",
  isAuthenticated,
  upload.single("file"),
  fileUploadController
);

route.delete("/fileDelete", isAuthenticated, deleteProfilePics);
module.exports = route;
