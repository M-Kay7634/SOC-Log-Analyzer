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
    res.status(200).json({
      success: true,
      message: "Log uploaded and parsed successfully",
      totalLogs: parsedLogs.length,
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