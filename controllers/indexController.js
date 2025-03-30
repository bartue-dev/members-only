const asyncHandler = require("express-async-handler");

exports.getIndex = asyncHandler(async (req, res, next) => {
  const loginErrMsg = req.session.messages

  //if user is not log in render index/log-in. If user is log in redirect to home route
  if (!req.user) {
    res.render("index", {
      title: "Members only",
      loginErrMsg: loginErrMsg || []
    });
  } else {
    res.redirect("/home");
  }
});