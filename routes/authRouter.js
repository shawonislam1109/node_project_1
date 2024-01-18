const router = require("express").Router();

const {
  signUpGetController,
  signUpPostController,
  loginGetController,
  loginPostController,
  logout,
} = require("../controllers/authController");
const {
  isUnAuthenticated,
  isAuthenticated,
} = require("../middleware/authMiddleware");
const { loginValidator } = require("../validator/login");
const { registerValidator } = require("../validator/registraion");

router.get("/register", isAuthenticated, signUpGetController);
router.post("/register", registerValidator, signUpPostController);

router.get("/login", isUnAuthenticated, loginGetController);
router.post("/login", isUnAuthenticated, loginValidator, loginPostController);

router.post("/logout", logout);

module.exports = router;
