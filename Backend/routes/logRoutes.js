const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

const { uploadLog, getAllLogs, deleteLog, bulkDeleteLogs, deleteMyLogs,deleteAllLogs } = require("../controllers/logController");

// Upload Log
router.post("/upload", protect, upload.single("logFile"), uploadLog);
router.get("/", protect, getAllLogs);
router.delete("/bulk", protect, bulkDeleteLogs);
router.delete("/my", protect, deleteMyLogs);
router.delete("/all", protect, deleteAllLogs);
router.delete("/:id", protect, deleteLog);

module.exports = router;