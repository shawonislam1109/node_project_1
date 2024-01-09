const { model, Schema } = require("mongoose");

// const comments = require("./Comments");
// const User = require("./Users");

const postSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
      maxlength: 100,
    },
    body: {
      type: String,
      require: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    tags: {
      type: [String],
      require: true,
    },
    thumbnail: String,
    readTime: String,
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Posts = model("posts", postSchema);
module.exports = Posts;
