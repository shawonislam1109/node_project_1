const Comments = require("../models/Comments");
const Comment = require("../models/Comments");
const Posts = require("../models/Post");

exports.postCommentByPost = async (req, res, next) => {
  const { postId } = req.params;
  const { body } = req.body;

  if (!req.user) {
    return res.json({ message: "you are not valid user" });
  }

  let comment = new Comment({
    post: postId,
    user: req.user._id,
    body,
    replies: [],
  });

  const createComment = await comment.save();

  try {
    await Posts.findOneAndUpdate(
      { _id: postId },
      {
        $push: { comments: createComment._id },
      }
    );

    const commentJSON = await Comment.findById({
      _id: createComment._id,
    }).populate({
      path: "user",
      select: "profilePics username",
    });

    return res.status(201).json({ data: commentJSON });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.postReplyByComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { body } = req.body;
  if (!req.user) {
    res.status(422).json({ message: "unacceptable data" });
  }

  try {
    const commentData = await Comments.findByIdAndUpdate(
      { _id: commentId },
      {
        $push: {
          replies: {
            body: body,
            user: req.user._id,
            profilePics: req.user.profilePics,
          },
        },
      },
      { new: true }
    );

    if (commentData) {
      return res.status(201).json({
        message: commentData,
      });
    }
  } catch (error) {
    console.error("Error updating comment:", error);
    next(error);
  }
};
