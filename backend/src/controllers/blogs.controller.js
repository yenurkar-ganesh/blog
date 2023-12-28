const blogSchema = require("../models/blog.model.js");
const asyncHandler = require("express-async-handler");

// GET || ALL BLOGS
// @routes /api/blogs
const getAllBlogs = asyncHandler(async (req, res) => {
  const findBlogs = await blogSchema.find();
  if (!findBlogs) {
    return res.status(404).json({ message: "No blogs found" });
  } else {
    res.status(200).json(findBlogs);
  }
});

// POSt || CREATE A BLOGS
// @routes /api/blogs
const createBlog = asyncHandler(async (req, res) => {
  const { title, shortDescription, description, image, author } = req.body;

  if (!title || !shortDescription || !description || !image || !author) {
    throw new Error("All Fields are Mandatory.!!");
    res.status(400);
  } else {
    const createNewBlog = await blogSchema.create(req.body);
    await res.status(201).json(createNewBlog);
  }
});

// GET || SHOW ONE BLOG
// @routes /api/blogs/:id
const showOneBlog = asyncHandler(async (req, res) => {
  const findBlogs = await blogSchema.findById({ _id: req.params.id });
  if (!findBlogs) {
    return res.status(404).json({ message: "No blog found" });
  } else {
    res.status(200).json(findBlogs);
  }
});

// PUT || UPDATE A BLOGS
// @routes /api/blogs
const updateBlog = asyncHandler(async (req, res) => {
  try {
    const findBlogs = await blogSchema.find({ _id: req.params.id });
    if (!findBlogs) {
      return res.status(404).json({ message: "No blogs found" });
    } else {
      const updateABlog = await blogSchema.findByIdAndUpdate(
        req.params.id,
        req.body, // Update with the data in req.body
        { new: true } // Options: new: true returns the modified document
      );
      res.status(200).json(updateABlog);
    }
  } catch (error) {
    console.error("Error while updating blog:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE || REMOVE A BLOGS
// @routes /api/blogs/:id
const deleteBlog = async (req, res) => {
  try {
    const findBlogs = await blogSchema.find({ _id: req.params.id });
    if (!findBlogs) {
      return res.status(404).json({ message: "No blogs found" });
    } else {
      const deleteABlog = await blogSchema.findByIdAndDelete(
        req.params.id,
        req.body, // Update with the data in req.body
        { new: true } // Options: new: true returns the modified document
      );
      res.status(200).json(deleteABlog);
    }
  } catch (error) {
    console.error("Error while deleting a Blog:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  showOneBlog,
  updateBlog,
  deleteBlog,
};
