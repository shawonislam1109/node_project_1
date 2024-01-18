const Profile = require("../models/Profile");

exports.dashBoardGetController = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      res.json({ message: "successFull gone to dashboard" });
    } else {
      res.json({ message: "There is no Profile" });
    }
  } catch (error) {
    next(error);
  }
};

exports.createProfileGetController = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      return res.json({ message: " gone to dashboard" });
    }
    return res.json({ message: "create your profile" });
  } catch (error) {
    next(error);
  }
};

exports.createProfileController = async (req, res) => {
  try {
  } catch (error) {}
};
exports.getEditProfileController = async (req, res) => {
  try {
  } catch (error) {}
};
exports.editProfileController = async (req, res) => {
  try {
  } catch (error) {}
};
