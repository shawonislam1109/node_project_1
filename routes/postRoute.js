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
  dislikedController,
} = require("../controllers/likeAndDislikeController");
const { exploreController } = require("../controllers/exploreController");

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

route.get("/explore", isAuthenticated, exploreController);
route.post("/likes/:postId", isAuthenticated, likeController);
route.post("/dislike/:postId", isAuthenticated, dislikedController);
route.delete("/delete/:id", isAuthenticated, postDeleteController);

module.exports = route;
