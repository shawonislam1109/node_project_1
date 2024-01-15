module.exports = () => {
  return (req, res, next) => {
    res.locals.user = req.user;
    res.locals.loggedIn = req.session.loggedIn;
    next();
  };
};
