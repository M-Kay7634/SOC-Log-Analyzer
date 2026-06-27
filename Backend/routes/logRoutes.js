const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

const { uploadLog } = require("../controllers/logController");

// Upload Log
router.post("/upload", protect, upload.single("logFile"), uploadLog);

module.exports = router;