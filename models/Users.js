const { model, Schema } = require("mongoose");

// const profile = require("./Profile");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      maxlength: 30,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "profile",
    },
    profilePics: {
      type: String,
      default: "public/upload/default.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("user", userSchema);
module.exports = User;
