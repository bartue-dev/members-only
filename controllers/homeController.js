const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

exports.getHome = asyncHandler(async (req, res, next) => {
  res.render("home", {
    title: "Home"
  });
});