const { validationResult, check } = require("express-validator");

exports.profileValidator = [check("user")];
