const router = require("express").Router();

const {
  signUpGetController,
  signUpPostController,
  loginGetController,
  loginPostController,
  logout,
} = require("../controllers/authController");

router.get("/sing-up", signUpGetController);
router.post("/sing-up", signUpPostController);

router.get("/login", loginGetController);
router.post("/login", loginPostController);

router.post("/logout", logout);

module.exports = router;
