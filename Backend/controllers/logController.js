const parseApacheLog = require("../parser/apacheParser");
const detectSQLInjection = require("../detection/sqlInjection");
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
    const analyzedLogs = parsedLogs.map((log) => {
      const sqlResult = detectSQLInjection(log.url);

      return {
        ...log,
        threat: sqlResult.detected,
        threatType: sqlResult.detected ? sqlResult.type : null,
        severity: sqlResult.detected ? sqlResult.severity : null,
        mitreTechnique: sqlResult.detected ? sqlResult.mitre : null,
        description: sqlResult.detected ? sqlResult.description : null,
      };
    });

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