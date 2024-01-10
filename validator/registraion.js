const { validationResult, check } = require("express-validator");
const User = require("../models/Users");

exports.resultsValidator = (req) => {
  const messages = [];
  if (!validationResult(req).isEmpty()) {
    const errors = validationResult(req).array();
    for (const i of errors) {
      messages.push(i);
    }
  }
  return messages;
};

exports.registerValidator = [
  check("username")
    .not()
    .notEmpty()
    .withMessage("username is required")
    .custom((val) => /[^A-za-z0-9\s]/g.test(val))
    .withMessage("Username not use unique characters"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email) => {
      let user = await User.findOne({ email });
      console.log(user);
      if (user) {
        return Promise.reject("email all ready is use");
      }
    })
    .normalizeEmail(),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be 8 characters"),
  check("confirmPassword").custom((confirmPassword, { req }) => {
    if (confirmPassword !== req.body.password) {
      throw new Error("Password does not match");
    }
    return true;
  }),

  (req, res, next) => {
    let result = validationResult(req);
    const result2 = result.formatWith((error) => error.msg).mapped();
    if (result2) {
      return res.status(422).json(result2);
    }
    next();
  },
];
