const { body } = require("express-validator");

const emptyMsg = "must not be empty";
const confirmPw = "password not match";

const validateSignup = [
  body("username").trim()
    .notEmpty().withMessage(`Username ${emptyMsg}`),
  body("password").trim()
    .notEmpty().withMessage(`Password ${emptyMsg}`)
    .isLength({min: 3}).withMessage(`Password must be atleast 3 characters`),
  body("confirm-password").custom((value, { req }) => {
    return value === req.body.password
  }).withMessage(`Password ${confirmPw}`)
]

module.exports = {
  validateSignup
}