const readingTime = require("reading-time");
const Posts = require("../models/Post");
const Profile = require("../models/Profile");

exports.createGetPostController = (req, res, next) => {};

exports.createPostController = async (req, res, next) => {
  let { title, body, tags } = req.body;

  const profile = await Profile.findOne({ user: req.user._id });

  if (!profile) {
    return res.json({ message: "please first create your profile" });
  }

  if (tags) {
    tags = tags.split(" ");
    tags = tags.map((t) => t.trim());
  }

  let readTime = readingTime(body).text;

  let post = new Posts({
    title,
    body,
    tags,
    author: req.user._id,
    thumbnail: "",
    readTime,
    likes: [],
    comments: [],
    dislikes: [],
  });

  if (req.file) {
    post.thumbnail = `/upload/${req.file.filename}`;
  }

  try {
    const createPost = await post.save();
    await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $push: { post: createPost._id } }
    );
    res.json({ data: createPost });
  } catch (error) {
    next(e);
  }
};

// update post
exports.updatePostController = async (req, res, next) => {
  let { title, body, tags } = req.body;
  const { id } = req.params;

  const postData = await Posts.findOne({ _id: id, author: req.user._id });

  if (!postData) {
    let error = new Error("you are not valid user");
    error.status = 404;
    throw error;
  }

  let readTime = readingTime(body).text;

  try {
    const updatePost = await Posts.findOneAndUpdate(
      { _id: id, author: req.user._id },
      {
        $set: {
          title: title || postData.title,
          body: body || postData.body,
          tags: tags || postData.tags,
          readTime: readTime || postData.readTime,
        },
      },
      {
        new: true,
      }
    );

    // response data
    res.json({ data: updatePost });
  } catch (error) {
    next(error);
  }
};

// deleted buttons
exports.postDeleteController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const PostDeletedData = await Posts.findOneAndDelete({
      _id: id,
      author: req.user._id,
    });

    if (!PostDeletedData) {
      return res.status(422).json({ message: "Unprocessable Entity" });
    }

    await Profile.findOneAndUpdate(
      {
        user: req.user._id,
      },
      {
        $pull: { post: id },
      }
    );

    if (PostDeletedData) {
      res.json({ message: "deleted successfully" });
    } else {
      let error = new Error("this api is not valid");
      error.status = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
