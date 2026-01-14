const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "..", "public", "img", "users"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `user-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = upload;
