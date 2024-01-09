const User = require("../models/Users");
const bcrypt = require("bcrypt");

exports.signUpGetController = async (req, res, next) => {
  const allUser = await User.find();
  try {
    res.json(allUser);
  } catch (error) {
    res.json({
      message: error?.message,
    });
  }
};

exports.signUpPostController = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    const createUser = await user.save();
    res.json(createUser);
  } catch (e) {
    console.log(e);
    res.json({
      message: error?.message,
    });
  }
};

exports.loginGetController = (req, res, next) => {};

exports.loginPostController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.json({
        message: "Invalid credential",
      });
    }

    let match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({
        message: "Invalid credential",
      });
    }

    res.json({
      message: "successFully login",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.logout = (req, res, next) => {};
