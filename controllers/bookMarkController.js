const Posts = require("../models/Post");
const Profile = require("../models/Profile");

exports.setBookMarkController = async (req, res, next) => {
  const { postId } = req.params;
  let bookmarks = null;

  try {
    const profileData = await Profile.findOne({ user: req.user._id });

    if (profileData.bookMarks.includes(postId)) {
      await Profile.findOneAndUpdate(
        { user: req.user._id },
        {
          $pull: { bookMarks: postId },
        }
      );
      bookmarks = false;
    } else {
      await Profile.findOneAndUpdate(
        { user: req.user._id },
        {
          $push: { bookMarks: postId },
        }
      );
      bookmarks = true;
    }

    const postData = await Posts.findById({ _id: postId });

    res.status(201).json({
      bookmarks,
      postData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
