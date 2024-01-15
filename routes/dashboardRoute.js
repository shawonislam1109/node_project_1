const {
  dashBoardGetController,
} = require("../controllers/dashboardController");
const { isAuthenticated } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get("/", isAuthenticated, dashBoardGetController);

module.exports = router;
