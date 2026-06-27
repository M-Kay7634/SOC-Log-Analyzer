const parseApacheLog = require("../parser/apacheParser");

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

    res.status(200).json({
      success: true,
      message: "Log uploaded and parsed successfully",
      totalLogs: parsedLogs.length,
      parsedLogs,
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