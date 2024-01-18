const User = require("../models/Users");

exports.bindUserWithRequest = () => {
  return async (req, res, next) => {
    if (!req.session.loggedIn) {
      return next();
    }
    try {
      let user = await User.findById(req.session.user._id);
      if (user) {
        req.user = user;
        next();
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

exports.isAuthenticated = (req, res, next) => {
  if (!req.session.loggedIn) {
    return res.json({ message: "unAuthorize token" });
  }
  next();
};

exports.isUnAuthenticated = (req, res, next) => {
  if (req.session.loggedIn) {
    return res.json({ message: "you allReady logged in" });
  }
  next();
};
