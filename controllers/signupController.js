const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");


exports.getSignUpForm = asyncHandler(async (req, res, next) => {
  res.render("sign-up", {
    title: "Sign Up"
  })
});

exports.postSignUp = asyncHandler(async (req, res, next) => {

  const { username } = req.body
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  await db.signUpUser(username, hashedPassword);


  res.redirect("/");

});