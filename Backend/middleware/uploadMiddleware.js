const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// Accept only log/text files
const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".log", ".txt"];

  const extension = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(new Error("Only .log and .txt files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;