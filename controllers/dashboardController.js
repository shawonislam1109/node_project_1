const Profile = require("../models/Profile");
const User = require("../models/Users");

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

// create profile
exports.createProfileController = async (req, res, next) => {
  const { name, title, bio, socialLinks, profilePics } = req.body;
  try {
    const profileData = new Profile({
      user: req.user._id,
      name,
      title,
      bio,
      socialLinks: {
        facebook: socialLinks.facebook || "",
        twitter: socialLinks.twitter || "",
        linkedIn: socialLinks.linkedIn || "",
        github: socialLinks.github || "",
      },
      profilePics: profilePics || req.user?.profilePics,
      post: [],
      bookMarks: [],
    });

    const userData = await Profile.findOne({ user: req.user._id });
    if (userData) {
      return res.json({ message: "profile allReady create" });
    }

    const createProfile = await profileData.save();

    await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          profile: createProfile._id,
        },
      }
    );
    res.json({ data: createProfile });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getEditProfileController = async (req, res) => {
  res.json({ data: "fdlsfjsdlfjlsdfjlsdfjl" });
};
exports.editProfileController = async (req, res) => {
  const { name, title, bio, socialLinks, profilePics, post, bookMarks } =
    req.body;
  try {
    const userProfile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      {
        $set: {
          name,
          title,
          bio,
          socialLinks: {
            facebook: socialLinks.facebook || "",
            twitter: socialLinks.twitter || "",
            linkedIn: socialLinks.linkedIn || "",
            github: socialLinks.github || "",
          },
          profilePics: profilePics || req.user?.profilePics,
          post: [],
          bookMarks: [],
        },
      },
      { new: true }
    );

    res.json({ data: userProfile, message: "Profile update successFully" });
  } catch (error) {}
};
