const upload = require("../middleware/uploadMiddleware");

const route = require("express").Router();

route.post("/upload", upload.single("file"), (req, res, next) => {
  res.json({ data: req.file });
});

module.exports = route;
