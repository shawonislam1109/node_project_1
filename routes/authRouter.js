const router = require("express").Router();

const {
  signUpGetController,
  signUpPostController,
  loginGetController,
  loginPostController,
  logout,
} = require("../controllers/authController");
const { loginValidator } = require("../validator/login");
const { registerValidator } = require("../validator/registraion");

router.get("/register", signUpGetController);
router.post("/register", registerValidator, signUpPostController);

router.get("/login", loginGetController);
router.post("/login", loginValidator, loginPostController);

router.post("/logout", logout);

module.exports = router;
