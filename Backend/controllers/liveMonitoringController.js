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
  monitoringConfig.logPath = logPath;

  res.json({
    success: true,
    message: "Monitoring configuration saved.",
    monitoring: monitoringConfig,
  });
};

const startMonitoring = (req, res) => {
  monitoringConfig.status = "Active";
  monitoringConfig.isMonitoring = true;

  res.json({
    success: true,
    message: "Live monitoring started.",
    monitoring: monitoringConfig,
  });
};

const stopMonitoring = (req, res) => {
  monitoringConfig.status = "Stopped";
  monitoringConfig.isMonitoring = false;

  res.json({
    success: true,
    message: "Live monitoring stopped.",
    monitoring: monitoringConfig,
  });
};

module.exports = {
  getMonitoringStatus,
  saveMonitoringConfig,
  startMonitoring,
  stopMonitoring,
};