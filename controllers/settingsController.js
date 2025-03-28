const asyncHandler = require("express-async-handler");


exports.getSettings = asyncHandler(async (req, res, next) => {
  res.render("settings", {
    title: "Settings"
  });
});