const {
  dashBoardGetController,
  createProfileController,
  createProfileGetController,
  getEditProfileController,
  editProfileController,
} = require("../controllers/dashboardController");
const { isAuthenticated } = require("../middleware/authMiddleware");

const router = require("express").Router();

// profile create
router.get("/", isAuthenticated, dashBoardGetController);
router.get("/get-create-profile", isAuthenticated, createProfileGetController);
router.post("/create-profile", isAuthenticated, createProfileController);

// edit profile router
router.get("/edit-profile", isAuthenticated, getEditProfileController);
router.patch("/edit-profile", isAuthenticated, editProfileController);

module.exports = router;
