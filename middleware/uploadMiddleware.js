const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    const types = /jpeg|jpg|png|gif/;
    const extName = types.test(
      path.extname(file.originalname).toLocaleLowerCase()
    );
    const mineTypes = types.test(file.mimetype);

    if (extName && mineTypes) {
      cb(null, true);
    } else {
      cb(new Error("only supported  /jpeg|jpg|png|gif/"));
    }
  },
});

module.exports = upload;
