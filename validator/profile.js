const { validationResult, body } = require("express-validator");
const validator = require("validator");

const linkValidator = (value) => {
  if (value) {
    if (!validator.isURL(value)) {
      throw new Error("provide a valid URL");
    }
  }
  return true;
};

exports.profileValidator = [
  body("name")
    .not()
    .notEmpty()
    .trim()
    .withMessage("name is required")
    .isLength({ max: 15 })
    .withMessage("max length will be 15"),
  body("title")
    .not()
    .notEmpty()
    .trim()
    .withMessage("title is required")
    .isLength({ max: 50 })
    .withMessage("max length will be 50"),
  body("bio")
    .not()
    .notEmpty()
    .trim()
    .withMessage("bio Data is required")
    .isLength({ max: 1000 })
    .withMessage("max length will be 1000"),

  body("socialLinks.twitter").optional().trim().custom(linkValidator),
  body("socialLinks.facebook").optional().trim().custom(linkValidator),
  body("socialLinks.linkedIn").optional().trim().custom(linkValidator),
  body("socialLinks.github").optional().trim().custom(linkValidator),
  body("profilePics").optional(),

  (req, res, next) => {
    const result2 = validationResult(req);
    // const result2 = result.formatWith((error) => error.msg).mapped();
    if (!result2.isEmpty()) {
      return res.status(422).json({ data: result2.errors });
    }
    next();
  },
];
