const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");
const { isAuth } = require("../authentication/authMiddleware");

postRouter.use(isAuth);

postRouter.get("/", postController.getPost);

module.exports = postRouter;