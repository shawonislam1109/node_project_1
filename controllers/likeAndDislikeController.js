const Posts = require("../models/Post");

// update controller
exports.likeController = async (req, res, next) => {
  const { postId } = req.params;
  let liked = null;

  if (!req.user) {
    return res.status(404).json({ error: "Post not found" });
  }

  try {
    let updateLikes = await Posts.findById({ _id: postId });

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
      liked = false;
    } else {
      await Posts.findByIdAndUpdate(
        { _id: postId },
        {
          $push: { likes: req.user._id },
        }
      );
      liked = true;
    }

    const likesData = await Posts.findById({ _id: postId });
    res.json({
      liked: liked,
      totalLikes: likesData.likes.length,
      totalDislikes: likesData.dislikes.length,
    });
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DisLike controller
exports.dislikedController = async (req, res, next) => {
  const { postId } = req.params;
  let disliked = null;

  if (!req.user) {
    return res.status(404).json({ error: "Post not found" });
  }

  try {
    let updateLikes = await Posts.findById({ _id: postId });

    if (updateLikes.likes.includes(req.user._id)) {
      await Posts.findByIdAndUpdate(
        { _id: postId },
        {
          $pull: { likes: req.user._id },
        }
      );
    }

    if (updateLikes.dislikes.includes(req.user._id)) {
      await Posts.findByIdAndUpdate(
        { _id: postId },
        {
          $pull: { dislikes: req.user._id },
        }
      );
      disliked = false;
    } else {
      await Posts.findByIdAndUpdate(
        { _id: postId },
        {
          $push: { dislikes: req.user._id },
        }
      );
      disliked = true;
    }

    const likesData = await Posts.findById({ _id: postId });
    res.json({
      disliked: disliked,
      totalDislikes: likesData.dislikes.length,
      totalLikes: likesData.likes.length,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
