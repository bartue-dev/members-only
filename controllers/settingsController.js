const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.getSettings = asyncHandler(async (req, res, next) => {
  res.render("settings", {
    title: "Settings",
    incorrectAnsMsg: false
  });
});

exports.postMembership = asyncHandler(async (req, res, next) => {
  const user_id = req.user.user_id;

  await db.users.toggleMembership(user_id);

  res.redirect("/settings");
});

exports.postAdmin = asyncHandler(async (req, res, next) => {
  const user_id = req.user.user_id;
  const { linux }= req.body
 
  if (linux.toLowerCase() !== "linus torvalds") {
    res.render("settings", {
      title: "Settings",
      incorrectAnsMsg: true
    });
  } else {
    await db.users.toggleisAdmin(user_id);
    res.redirect("/settings");
  }
});