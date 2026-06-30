const { getIO } = require("../socket/socket");
const { randomUUID } = require("crypto");
const Log = require("../models/Log");
const {parseApacheLog} = require("../parser/apacheParser");
const { analyzeLogs } = require("../services/logAnalysisService");
// Upload Log Controller
const uploadLog = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const uploadBatchId = randomUUID();

    // Parse uploaded Apache log
    const parsedLogs = parseApacheLog(req.file.path);


    const analyzedLogs = await analyzeLogs(
        parsedLogs,
        req.user.id,
        {
          sourceFile: req.file.originalname,
          uploadBatchId: Date.now().toString(),
        }
    );
    

    const io = getIO();

    io.emit("newLog", {
      totalLogs: analyzedLogs.length,
      threats: analyzedLogs.filter((log) => log.threat).length,
      sourceFile: req.file.originalname,
      uploadedBy: req.user.name,
      uploadedAt: new Date(),
    });
    io.emit("dashboardUpdated");
    
    res.status(201).json({
      success: true,
      message: "Logs analyzed and stored successfully",
      totalLogs: analyzedLogs.length,
      uploadBatchId,
      sourceFile: req.file.originalname,
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

// Get All Logs
const getAllLogs = async (req, res) => {
  try {
    const query = {};

      const {
        startDate,
        endDate,
        severity,
        threatType,
      } = req.query;

      if (severity) {
        query.severity = severity;
      }

      if (threatType) {
        query.threatType = threatType;
      }

      if (startDate || endDate) {
        query.createdAt = {};

        if (startDate) {
          query.createdAt.$gte = new Date(startDate);
        }

        if (endDate) {
          query.createdAt.$lte = new Date(endDate);
        }
      }

      const logs = await Log.find(query)
        .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: logs.length,
      logs,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Single Log
const deleteLog = async (req, res) => {
  try {
    const { id } = req.params;

    const log = await Log.findById(id);

    if (!log) {
      return res.status(404).json({
        success: false,
        message: "Log not found",
      });
    }

    // Authorization check
    if (
      req.user.role !== "Admin" &&
      log.uploadedBy.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this log",
      });
    }

    await Log.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Log deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Bulk Delete Logs
const bulkDeleteLogs = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No logs selected",
      });
    }

    // Admin can delete everything
    if (req.user.role === "Admin") {
      await Log.deleteMany({
        _id: { $in: ids },
      });

      return res.status(200).json({
        success: true,
        message: "Selected logs deleted successfully",
      });
    }

    // Analyst → only own logs
    await Log.deleteMany({
      _id: { $in: ids },
      uploadedBy: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "Selected logs deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete My Uploaded Logs
const deleteMyLogs = async (req, res) => {
  try {
    const result = await Log.deleteMany({
      uploadedBy: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} logs deleted successfully`,
      deletedCount: result.deletedCount,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete All Logs (Admin Only)
const deleteAllLogs = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Only Admin can delete all logs.",
      });
    }

    const result = await Log.deleteMany({});

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} logs deleted successfully.`,
      deletedCount: result.deletedCount,
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
  getAllLogs,
  deleteLog,
  bulkDeleteLogs,
  deleteMyLogs,
  deleteAllLogs,
};