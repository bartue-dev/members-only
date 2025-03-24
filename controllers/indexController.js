const asyncHandler = require("express-async-handler");

exports.getIndex = asyncHandler(async (req, res, next) => {
  res.send("Hello From getIndex");
});