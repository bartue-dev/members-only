const { Router } = require("express");
const faqRouter = Router();
const faqController = require("../controllers/faqController");
const { isAuth } = require("../authentication/authMiddleware");

faqRouter.use(isAuth);

faqRouter.get("/", faqController.getFaq);

module.exports = faqRouter;

