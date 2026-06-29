const Log = require("../models/Log");

const detectThreats = require("../detection");
const correlateThreats = require("../correlation");
const calculateThreatScore = require("../scoring/threatScoring");

const analyzeLogs = async (logs, uploadedBy,metadata={}) => {

  // Step 1
  let analyzedLogs = logs.map(log => ({
    ...log,
    ...detectThreats(log),
  }));

  // Step 2
  analyzedLogs = correlateThreats(analyzedLogs);

  // Step 3
  analyzedLogs = analyzedLogs.map(log => ({
    ...log,
    ...calculateThreatScore(log.threatType),
  }));

  // Step 4
  const logsToSave = analyzedLogs.map(log => ({
    ...log,
    uploadedBy,
    sourceFile: metadata.sourceFile || "Live Monitoring",
    uploadBatchId: metadata.uploadBatchId || Date.now().toString(),
  }));

  await Log.insertMany(logsToSave);

  return analyzedLogs;
};

module.exports = {
  analyzeLogs,
};