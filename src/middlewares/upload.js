const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const nameFormat = `${file.fieldname}-${Date.now()}-${Math.floor(
      Math.random() * 1000 * 1000
    )}${path.extname(file.originalname)}`;
    cb(null, nameFormat);
  },
});

const upload = multer({ storage, limits: { fileSize: 3 * 1000 * 1000 } });

module.exports = {
  upload,
};
