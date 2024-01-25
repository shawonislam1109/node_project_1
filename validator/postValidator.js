const cheerio = require("cheerio");
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

exports.postValidator = [
  body("title")
    .not()
    .notEmpty()
    .trim()
    .withMessage("name is required")
    .isLength({ max: 50 })
    .withMessage("max length will be 50"),
  body("body")
    .not()
    .notEmpty()
    .custom((value) => {
      let node = cheerio.load(value);
      let text = node.text();

      if (text.length > 5000) {
        throw new Error("Body will be 5000");
      }

      return true;
    }),
  body("tags").not().notEmpty().trim().withMessage("tags is required"),
  (req, res, next) => {
    const result2 = validationResult(req);
    // const result2 = result.formatWith((error) => error.msg).mapped();
    if (!result2.isEmpty()) {
      return res.status(422).json({ data: result2.errors });
    }
    next();
  },
];
