const { setBookMarkController } = require("../controllers/bookMarkController");
const { isAuthenticated } = require("../middleware/authMiddleware");

const route = require("express").Router();

route.post("/setBookMark/:postId", isAuthenticated, setBookMarkController);

module.exports = route;
