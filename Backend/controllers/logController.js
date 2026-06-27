const parseApacheLog = require("../parser/apacheParser");
const detectSQLInjection = require("../detection/sqlInjection");
const detectDirectoryTraversal = require("../detection/directoryTraversal");
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

    const traversalResult = detectDirectoryTraversal(log.url);

    let threat = false;
    let threatType = null;
    let severity = null;
    let mitreTechnique = null;
    let description = null;

    if (sqlResult.detected) {
      threat = true;
      threatType = sqlResult.type;
      severity = sqlResult.severity;
      mitreTechnique = sqlResult.mitre;
      description = sqlResult.description;
    }

    if (traversalResult.detected) {
      threat = true;
      threatType = traversalResult.type;
      severity = traversalResult.severity;
      mitreTechnique = traversalResult.mitre;
      description = traversalResult.description;
    }

    return {
      ...log,
      threat,
      threatType,
      severity,
      mitreTechnique,
      description,
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