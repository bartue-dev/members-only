const { Router } = require("express");
const settingsRouter = Router();
const settingsController = require("../controllers/settingsController");
const { isAuth } = require("../authentication/authMiddleware")

settingsRouter.use(isAuth);

settingsRouter.get("/", settingsController.getSettings);

module.exports = settingsRouter;