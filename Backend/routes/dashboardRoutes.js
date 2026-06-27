const express = require("express");
const router = express.Router();

const { getSummary, getThreatDistribution, getTopAttackingIPs, getThreatTimeline } = require("../controllers/dashboardController");
const protect = require("../middleware/authMiddleware");

router.get("/summary", protect, getSummary);
router.get("/threat-distribution",protect, getThreatDistribution);
router.get("/top-ips", protect, getTopAttackingIPs);
router.get("/timeline", protect, getThreatTimeline);
module.exports = router;