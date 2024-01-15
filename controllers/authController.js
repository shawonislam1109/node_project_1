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
      message: e?.message,
    });
  }
};

exports.loginGetController = (req, res, next) => {
  // console.log(req.get("Cookie"));

  res.json({
    user: req.session.user,
    isLoggedIn: req.session.loggedIn,
  });
  console.log(req.session.user);
  console.log(req.session.loggedIn);
};

// login
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

    // res.setHeader("Set-Cookie", "isLoggedIn=true");

    // session
    req.session.loggedIn = true;
    req.session.user = user;

    req.session.save((err) => {
      if (err) {
        console.log(err);
        return next();
      }
    });

    res.status(200).json({
      message: "successFully login",
      data: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      next();
    }
    res.json({
      message: "logout successFully",
    });
  });
};
