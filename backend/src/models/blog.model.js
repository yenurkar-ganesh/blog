const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, `Blog Title is Required!`],
    },
    shortDescription: {
      type: String,
      required: [true, `Short Description is required!`],
      // min: [150, `Minimum 150 Characters is Required for Short Description`],
      // max: [500, `Maximum 500 Characters is Required for Short Description`],
    },
    description: {
      type: String,
      required: [true, "Description field is required"],
    },
    author: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: [true, `Image Field is Required!`],
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
