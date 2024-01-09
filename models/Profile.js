const { model, Schema } = require("mongoose");

// const postModel = require("./Post");
// const userModel = require("./Users");

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "userModel",
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    profilePicture: String,
    socialLinks: {
      twitter: String,
      facebook: String,
      linkedIn: String,
      github: String,
    },
    post: [
      {
        type: Schema.Types.ObjectId,
        ref: "postModel",
      },
    ],
    bookMarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "postModel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Profile = model("profile", profileSchema);
module.exports = Profile;
