const { Router } = require("express");
const homeController = require("../controllers/homeController");
const homeRouter = Router();
const { isAuth } = require("../authentication/authMiddleware")

//authenticate user before access the routes
homeRouter.use(isAuth);

homeRouter.get("/", homeController.getHome);

homeRouter.post("/add-post", homeController.addPost);

homeRouter.post("/:user_id/delete", homeController.postDeleteUser);

module.exports = homeRouter;