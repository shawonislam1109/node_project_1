const { validationResult, check } = require("express-validator");
const User = require("../models/Users");

exports.loginValidator = [
  check("email").notEmpty().withMessage("username or email is required"),
  check("password").notEmpty().withMessage("password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.formatWith((error) => error.msg).mapped();
      return res.status(422).json(formattedErrors);
    }
    next();
  },
];
