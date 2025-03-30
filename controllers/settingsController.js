const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.getSettings = asyncHandler(async (req, res, next) => {
  res.render("settings", {
    title: "Settings"
  });
});

exports.postMembership = asyncHandler(async (req, res, next) => {
  const user_id = req.user.user_id;

  await db.toggleMembership(user_id);

  res.redirect("/settings");
});