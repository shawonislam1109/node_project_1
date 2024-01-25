const router = require("express").Router();
const {
  postCommentByPost,
  postReplyByComment,
} = require("../controllers/CommentController");
const {
  isUnAuthenticated,
  isAuthenticated,
} = require("../middleware/authMiddleware");

router.post("/comment/:postId", isAuthenticated, postCommentByPost);
router.put("/comment/reply/:commentId", isAuthenticated, postReplyByComment);

module.exports = router;
