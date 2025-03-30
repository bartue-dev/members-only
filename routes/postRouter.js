const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");
const { isAuth } = require("../authentication/authMiddleware");

//authenticate user before access the routes
postRouter.use(isAuth);

postRouter.get("/", postController.getPost);

postRouter.post("/:post_id/delete", postController.postDeletePost);

module.exports = postRouter;