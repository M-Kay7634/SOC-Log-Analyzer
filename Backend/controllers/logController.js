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


module.exports = {
  uploadLog,
  getAllLogs,
  deleteLog,
};