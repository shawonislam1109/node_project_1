const Profile = require("../models/Profile");
const User = require("../models/Users");
const fs = require("fs");

exports.fileUploadController = async (req, res, next) => {
  if (req.file) {
    let profilePics = `/upload/${req.file.filename}`;
    try {
      fs.unlink(`public/${req.file.profilePics}`, async (err) => {
        let profile = await Profile.findOne({ user: req.user?._id });

        if (profile) {
          await Profile.findOneAndUpdate(
            { _id: req.user?._id },
            {
              $set: {
                profilePics,
              },
            }
          );
        }

        await User.findOneAndUpdate(
          { _id: req.user?._id },
          {
            $set: { profilePics },
          }
        );
      });

      res.status(200).json({ file: profilePics });
    } catch (error) {
      next(error);
    }
  } else {
    res.status(500).json({ message: "internal server error" });
  }
};

exports.deleteProfilePics = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user?._id });

    if (profile) {
      await Profile.findOneAndUpdate(
        { _id: req.user?._id },
        {
          $set: {
            profilePics,
          },
        }
      );
    }

    await User.findOneAndUpdate(
      { _id: req.user?._id },
      {
        $set: { profilePics: "" },
      }
    );

    res.status(200).json({ message: "remove successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
