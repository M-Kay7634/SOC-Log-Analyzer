const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getMonitoringStatus,
  saveMonitoringConfig,
  startMonitoring,
  stopMonitoring
} = require("../controllers/liveMonitoringController");

router.get("/status", protect, getMonitoringStatus);

router.post("/config", protect, saveMonitoringConfig);

router.post("/start", protect, startMonitoring);

router.post("/stop", protect, stopMonitoring);

module.exports = router;