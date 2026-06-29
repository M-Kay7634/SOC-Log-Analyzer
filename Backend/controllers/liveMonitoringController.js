const {startWatcher,stopWatcher,} = require("../services/liveMonitoring/watcher");
const { parseApacheLine } = require("../parser/apacheParser");
const { analyzeLogs } = require("../services/logAnalysisService");
let monitoringConfig = {
  source: "Apache",
  logPath: "",
  status: "Stopped",
  isMonitoring: false,
  linesProcessed: 0,
  threatsDetected: 0,
};


const getMonitoringStatus = (req, res) => {
  res.json({
    success: true,
    monitoring: monitoringConfig,
  });
};

const saveMonitoringConfig = (req, res) => {
  const { source, logPath } = req.body;

  monitoringConfig.source = source;
  monitoringConfig.logPath = logPath.trim().replace(/^"+|"+$/g, "");

  res.json({
    success: true,
    message: "Monitoring configuration saved.",
    monitoring: monitoringConfig,
  });
};

const startMonitoring = (req, res) => {

  if (!monitoringConfig.logPath) {
    return res.status(400).json({
      success: false,
      message: "Configure a log file first.",
    });
  }

  monitoringConfig.status = "Active";
  monitoringConfig.isMonitoring = true;

  console.log("PATH =", monitoringConfig.logPath);

  const fs = require("fs");

  if (!fs.existsSync(monitoringConfig.logPath)) {
    return res.status(400).json({
      success: false,
      message: "Log file does not exist.",
    });
  }
  startWatcher(
    monitoringConfig.logPath,
    async (line) => {
      try {
        console.log("NEW LOG:", line);

        const parsedLog = parseApacheLine(line);

        if (!parsedLog) {
          console.log("Skipped invalid log line.");
          return;
        }

        await analyzeLogs(
          [parsedLog],
          req.user.id,
          {
            sourceFile: monitoringConfig.logPath,
            uploadBatchId: "LIVE-" + Date.now(),
          }
        );

        monitoringConfig.linesProcessed++;
        monitoringConfig.lastEvent = new Date().toLocaleTimeString();

        console.log("✅ Live log analyzed and stored.");

      } catch (err) {
        console.error("Live Monitoring Error:", err);
      }
    }
  );

  res.json({
    success: true,
    message: "Monitoring started.",
    monitoring: monitoringConfig,
  });
};

const stopMonitoring = (req, res) => {
   console.log("STOP API CALLED");
  stopWatcher();

  monitoringConfig.status = "Stopped";
  monitoringConfig.isMonitoring = false;

  res.json({
    success: true,
    message: "Monitoring stopped.",
    monitoring: monitoringConfig,
  });
};

module.exports = {
  getMonitoringStatus,
  saveMonitoringConfig,
  startMonitoring,
  stopMonitoring,
};