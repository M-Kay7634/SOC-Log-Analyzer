const express = require("express");
const router = express.Router();

const { getSummary, getThreatDistribution, getTopAttackingIPs, getThreatTimeline, getRecentThreats, getAttackOrigins, } = require("../controllers/dashboardController");
const protect = require("../middleware/authMiddleware");

router.get("/summary", protect, getSummary);
router.get("/threat-distribution",protect, getThreatDistribution);
router.get("/top-ips", protect, getTopAttackingIPs);
router.get("/timeline", protect, getThreatTimeline);
router.get("/recent-threats", protect, getRecentThreats);
router.get("/attack-origins", protect, getAttackOrigins);

module.exports = router;