const fs = require("fs");

const { getIO } = require("../socket/socket");
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
  lastEvent: "",
  activities: [],
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

  if (monitoringConfig.isMonitoring) {
    return res.status(400).json({
      success: false,
      message: "Monitoring is already running.",
    });
  }

  if (!monitoringConfig.logPath) {
    return res.status(400).json({
      success: false,
      message: "Configure a log file first.",
    });
  }


  console.log("PATH =", monitoringConfig.logPath);


  if (!fs.existsSync(monitoringConfig.logPath)) {
    return res.status(400).json({
      success: false,
      message: "Log file does not exist.",
    });
  }

  monitoringConfig.status = "Running";
  monitoringConfig.isMonitoring = true;
  monitoringConfig.startedAt = new Date().toLocaleString();

  // Reset monitoring statistics for a fresh session
  monitoringConfig.linesProcessed = 0;
  monitoringConfig.threatsDetected = 0;
  monitoringConfig.activities = [];
  monitoringConfig.lastEvent = "";

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

        
        const analyzed = await analyzeLogs(
          [parsedLog],
          req.user.id,
          {
            sourceFile: monitoringConfig.logPath,
            uploadBatchId: "LIVE-" + Date.now(),
          }
        );

        const analyzedLog = analyzed[0];

        const io = getIO();

        // Send complete analyzed log
        io.emit("liveLog", analyzedLog);

        // Refresh dashboard
        io.emit("dashboardUpdated");

        // Show alert if it's a threat
        if (analyzedLog.threat) {
          io.emit("criticalThreat", analyzedLog);
        }

        console.log("📡 Live event emitted");

        // Update monitoring statistics
        monitoringConfig.linesProcessed++;

        if (analyzedLog.threat) {
          monitoringConfig.threatsDetected++;
        }

        monitoringConfig.lastEvent =
          new Date().toLocaleTimeString();

        // Store recent activity
        monitoringConfig.activities.unshift({
          time: new Date().toLocaleTimeString(),
          ip: analyzedLog.ip,
          event: analyzedLog.threat
            ? analyzedLog.threatType
            : `${analyzedLog.method} ${analyzedLog.url}`,
          priority: analyzedLog.priority || "Normal",
        });

        monitoringConfig.activities =
          monitoringConfig.activities.slice(0, 20);

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

  if (!monitoringConfig.isMonitoring) {
    return res.status(400).json({
      success: false,
      message: "Monitoring is not running.",
    });
  }
  stopWatcher();

  monitoringConfig.status = "Stopped";
  monitoringConfig.isMonitoring = false;
  monitoringConfig.startedAt = "";

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