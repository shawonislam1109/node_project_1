const Posts = require("../models/Post");

// update controller
exports.likeController = async (req, res, next) => {
  try {
    const { postId } = req.params;
    let liked = null;

    let updateLikes = await Posts.findById({ _id: postId });
    if (!updateLikes) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (updateLikes.dislikes.includes(req.user._id)) {
      await Posts.findByIdAndUpdate(
        { _id: postId },
        {
          $pull: { dislikes: req.user._id },
        }
      );
    }

    if (updateLikes.likes.includes(req.user._id)) {
      await Posts.findByIdAndUpdate(
        { _id: postId },
        {
          $pull: { likes: req.user._id },
        }
      );
    } else if (!updateLikes.likes.includes(req.user._id)) {
      await Posts.findByIdAndUpdate(
        { _id: postId },
        {
          $push: { likes: req.user._id },
        }
      );
    }
    res.json({ message: "Likes updated successfully", post: updateLikes });
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DisLike controller
exports.updateController = async (req, res, next) => {
  const { postId } = req.params;

  let dislikesData = await Posts.findById({ _id: postId });
  if (!dislikesData) {
    return res.status(404).json({ error: "Post not found" });
  }
  try {
    if (dislikesData.likes.includes(req.user._id)) {
      await Posts.findByIdAndUpdate(
        { _id: postId },
        {
          $pull: { likes: req.user._id },
        }
      );
    }

    if (dislikesData.dislikes.includes(req.user._id)) {
      await Posts.findByIdAndUpdate(
        {
          _id: postId,
        },
        {
          $pull: { dislikes: req.user._id },
        }
      );
    } else if (!dislikesData.dislikes.includes(req.user._id)) {
      await Posts.findByIdAndUpdate(
        {
          _id: postId,
        },
        {
          $push: { dislikes: req.user._id },
        }
      );
    } else {
      res.status(422).json({ message: "somethings went wrong" });
    }

    res.status(201).json({ data: dislikesData });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
