const Log = require("../models/Log");
const parseApacheLog = require("../parser/apacheParser");
const detectThreats = require("../detection");
const correlateThreats = require("../correlation");
const calculateThreatScore = require("../scoring/threatScoring");
// Upload Log Controller
const uploadLog = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Parse uploaded Apache log
    const parsedLogs = parseApacheLog(req.file.path);

    // Add SQL Injection detection to each log
    // Step 1 - Individual Detection
    let analyzedLogs = parsedLogs.map((log) => ({
      ...log,
      ...detectThreats(log),
    }));

    // Step 2 - Correlation
    analyzedLogs = correlateThreats(analyzedLogs);

    // Step 3 - Threat Scoring
    analyzedLogs = analyzedLogs.map((log) => ({
      ...log,
      ...calculateThreatScore(log.threatType),
    }));
    // Step 4 - Save analyzed logs to MongoDB
    const logsToSave = analyzedLogs.map((log) => ({
      ...log,
      uploadedBy: req.user.id,
    }));

    await Log.insertMany(logsToSave);
    res.status(201).json({
      success: true,
      message: "Logs analyzed and stored successfully",
      totalLogs: analyzedLogs.length,
      analyzedLogs,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadLog,
};