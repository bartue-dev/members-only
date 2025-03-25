const { Router } = require("express");
const signupController = require("../controllers/signupController");
const signupRouter = Router();

signupRouter.get("/", signupController.getSignUpForm);

signupRouter.post("/",signupController.postSignUp);

module.exports = signupRouter;