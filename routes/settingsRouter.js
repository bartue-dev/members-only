const { Router } = require("express");
const settingsRouter = Router();
const settingsController = require("../controllers/settingsController");
const { isAuth } = require("../authentication/authMiddleware")

//authenticate user before access the routes
settingsRouter.use(isAuth);

settingsRouter.get("/", settingsController.getSettings);

settingsRouter.post("/membership", settingsController.postMembership);

module.exports = settingsRouter;