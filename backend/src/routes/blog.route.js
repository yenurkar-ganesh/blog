const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  createBlog,
  showOneBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogs.controller.js");

router.route("/").get(getAllBlogs);
router.route("/").post(createBlog);
router.route("/:id").get(showOneBlog);
router.route("/:id").put(updateBlog);
router.route("/:id").delete(deleteBlog);

module.exports = router;
