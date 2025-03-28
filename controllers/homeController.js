const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.getHome = asyncHandler(async (req, res, next) => {
  const user_id = req.user.user_id;

  const myPost = await db.getMyPost(user_id);

  res.render("home", {
    title: "Home",
    myPost: myPost
  });
});

exports.addPost = asyncHandler(async (req, res, next) => {
  const { title, message} = req.body;
  const user_id = req.user.user_id;

  console.log("user_id?", user_id);
  

  await db.addPost(title, message, user_id);

  res.redirect("/home");
});