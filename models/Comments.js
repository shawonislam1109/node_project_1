const { model, Schema } = require("mongoose");

// const postModel = require("./Post");
// const User = require("./Users");

const commentsSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "postModel",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    replies: [
      {
        body: {
          type: String,
          required: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        createAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Comments = model("comments", commentsSchema);
module.exports = Comments;
