const {
  dashBoardGetController,
  createProfileGetController,
  getEditProfileController,
  editProfileController,
  createProfileController,
} = require("../controllers/dashboardController");
const { isAuthenticated } = require("../middleware/authMiddleware");
const { profileValidator } = require("../validator/profile");

const router = require("express").Router();

// profile create
router.get("/", isAuthenticated, dashBoardGetController);
router.get("/get-create-profile", isAuthenticated, createProfileGetController);
router.post(
  "/create-profile",
  isAuthenticated,
  profileValidator,
  createProfileController
);

// edit profile router
router.get("/edit-profile", isAuthenticated, getEditProfileController);
profileValidator,
  router.put(
    "/edit-profile",
    isAuthenticated,
    profileValidator,
    editProfileController
  );

module.exports = router;
