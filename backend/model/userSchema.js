const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter your name"],
    },
    lastname: {
      type: String,
      required: [true, "please enter your lastname"],
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "please enter your username"],
    },
    password: {
      type: String,
      required: [true, "please enter your password"],
    },
    // confirmPassword: {
    //   type: String,
    //   required: [true, "please confirm your password"],
    // },
    isAmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
