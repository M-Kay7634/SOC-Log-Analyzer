const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

const { uploadLog, getAllLogs } = require("../controllers/logController");

// Upload Log
router.post("/upload", protect, upload.single("logFile"), uploadLog);
router.get("/", protect, getAllLogs);

module.exports = router;