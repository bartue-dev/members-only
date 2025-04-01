const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.getPost = asyncHandler(async (req, res, next) => {

  const allPost = await db.post.getAllPost();

  res.render("posts", {
    title: "Posts",
    allPost: allPost
  });
});

exports.postDeletePost = asyncHandler(async (req, res, next) => {
  const { post_id } = req.params;
  
  await db.post.deletePost(post_id);

  res.redirect("/posts");
});