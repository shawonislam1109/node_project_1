const router = require("express").Router();

const { check, validationResult } = require("express-validator");

router.get(
  "/validator",
  [
    check("username")
      .not()
      .notEmpty()
      .trim()
      .isLength({ max: 15 })
      .withMessage("username maximum is 15"),

    check("email").isEmail().withMessage("Is not a email"),
  ],
  (req, res, next) => {
    let error = validationResult(req);
    console.log(error);
  }
);

router.post(
  "/validator",
  [
    check("username")
      .not()
      .notEmpty()
      .isLength({ max: 15 })
      .withMessage("username maximum is 15"),

    check("email").isEmail().withMessage("Is not a email"),
    check("password").custom((value) => {
      if (value.length <= 5) {
        throw new Error("password grater than five");
      }
      return true;
    }),
    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password is not match");
      }
    }),
  ],
  (req, res, next) => {
    let result = validationResult(req);
    const result2 = result.formatWith((error) => error.msg).mapped();
    console.log("formate error", result2);
  }
);

module.exports = router;
