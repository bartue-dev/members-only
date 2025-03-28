const { Router } = require("express");
const homeController = require("../controllers/homeController");
const homeRouter = Router();
const { isAuth } = require("../authentication/authMiddleware")

homeRouter.use(isAuth);

homeRouter.get("/", homeController.getHome);

homeRouter.post("/add-post", homeController.addPost);

module.exports = homeRouter;