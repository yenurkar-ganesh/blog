const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, `To Register username is required!`],
      min: 4,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, `To Register username is required!`],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
