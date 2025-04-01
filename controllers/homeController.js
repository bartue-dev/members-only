const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { validationResult } = require("express-validator");
const { validatePost } = require("../validator/express-validator");

exports.getHome = asyncHandler(async (req, res, next) => {
  const user_id = req.user.user_id;

  const myPost = await db.post.getMyPost(user_id);
  const allUsers = await db.users.getAllUsers();
  
  res.render("home", {
    title: "Home",
    myPost: myPost,
    allUsers: allUsers,
    errors: []
  });
});

exports.addPost = [validatePost, asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  const { title, message} = req.body;
  const user_id = req.user.user_id;
  const myPost = await db.post.getMyPost(user_id);

  if (!errors.isEmpty()) {
    return res.status(400).render("home", {
      title: "Home",
      myPost: myPost,
      errors: errors.array()
    })
  }

  await db.post.addPost(title, message, user_id);

  res.redirect("/home");
})
];

exports.postDeleteUser = asyncHandler(async (req, res, next) => {
  const { user_id } = req.params;

  await db.users.deleteUser(user_id);

  res.redirect("/home")
});