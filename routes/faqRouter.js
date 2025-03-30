const { Router } = require("express");
const faqRouter = Router();
const faqController = require("../controllers/faqController");
const { isAuth } = require("../authentication/authMiddleware");

//authenticate user before access the routes
faqRouter.use(isAuth);

faqRouter.get("/", faqController.getFaq);

module.exports = faqRouter;

