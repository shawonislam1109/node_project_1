const {
  createPostController,
  createGetPostController,
  updatePostController,
  postDeleteController,
} = require("../controllers/postController");

const { isAuthenticated } = require("../middleware/authMiddleware");
const { postValidator } = require("../validator/postValidator");

const upload = require("../middleware/uploadMiddleware");
const {
  likeController,
  updateController,
} = require("../controllers/likeAndDislikeController");

const route = require("express").Router();

route.get("/get-post", isAuthenticated, createGetPostController);
route.post(
  "/create-post",
  isAuthenticated,
  upload.single("post-thumbnail"),
  postValidator,
  createPostController
);
route.patch(
  "/update-post/:id",
  isAuthenticated,
  postValidator,
  updatePostController
);

route.post("/likes/:postId", isAuthenticated, likeController);
route.post("/dislike/:postId", isAuthenticated, updateController);
route.delete("/delete/:id", isAuthenticated, postDeleteController);

module.exports = route;
