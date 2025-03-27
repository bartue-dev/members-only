const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const { validateSignup } = require("../validator/express-validator");


exports.getSignUpForm = asyncHandler(async (req, res, next) => {
  res.render("sign-up", {
    title: "Sign Up",
    errors: []
  })
});

exports.postSignUp = [ validateSignup,  asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  const { username } = req.body
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (!errors.isEmpty()) {
    return res.status(400).render("sign-up", {
      title: "Sign up",
      errors: errors.array()
    });
  }

  await db.signUpUser(username, hashedPassword);

  res.redirect("/");

})
];