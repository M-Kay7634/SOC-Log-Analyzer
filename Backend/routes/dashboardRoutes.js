const express = require("express");
const router = express.Router();

const { getSummary, getThreatDistribution } = require("../controllers/dashboardController");
const protect = require("../middleware/authMiddleware");

router.get("/summary", protect, getSummary);
router.get("/threat-distribution",protect, getThreatDistribution);
module.exports = router;