const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.getPost = asyncHandler(async (req, res, next) => {

  const allPost = await db.getAllPost();

  res.render("posts", {
    title: "Posts",
    allPost: allPost
  });
});