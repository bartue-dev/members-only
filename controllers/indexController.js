const asyncHandler = require("express-async-handler");

exports.getIndex = asyncHandler(async (req, res, next) => {
  const loginErrMsg = req.session.messages

  res.render("index", {
    title: "Members only",
    loginErrMsg: loginErrMsg || []
  });
});