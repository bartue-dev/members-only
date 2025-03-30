
//authentication middleware.
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.render("notLogin")
  }
}

module.exports = {
  isAuth
}