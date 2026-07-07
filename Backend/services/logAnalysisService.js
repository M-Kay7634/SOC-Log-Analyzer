const { lookupIP } = require("./geoipService");
const { sendEmail } = require("./email/emailService");
const threatAlertTemplate = require("../services/email/threatAlertTemplate");
const Log = require("../models/Log");
const Settings = require("../models/Settings");

const detectThreats = require("../detection");
const correlateThreats = require("../correlation");
const calculateThreatScore = require("../scoring/threatScoring");

const analyzeLogs = async (logs, uploadedBy, metadata = {}) => {

  // Step 1 - Detect threats
  let analyzedLogs = logs.map((log) => ({
    ...log,
    ...detectThreats(log, metadata.source || "Apache"),
  }));

  // Step 2 - Correlate threats
  analyzedLogs = correlateThreats(analyzedLogs);

  // Step 3 - Calculate priority & severity
  analyzedLogs = analyzedLogs.map((log) => ({
    ...log,
    ...calculateThreatScore(log.threatType),
  }));

  // ============================
  // Step 4 - Send Email Alerts
  // ============================

  const settings = await Settings.findOne();

  for (const log of analyzedLogs) {
    if (log.ip) {
      const geo = lookupIP(log.ip);

      log.country = geo.country;
      log.region = geo.region;
      log.city = geo.city;
      log.timezone = geo.timezone;
    } else {
      log.country = "Unknown";
      log.region = "Unknown";
      log.city = "Unknown";
      log.timezone = "Unknown";
    }
    if (
      log.threat &&
      (log.priority === "High" ||
        log.priority === "Critical")
    ) {
      try {

        if (
          settings &&
          settings.emailAlertsEnabled &&
          settings.alertEmail
        ) {

          let shouldSend = false;

          if (
            log.priority === "High" &&
            settings.highAlerts
          ) {
            shouldSend = true;
          }

          if (
            log.priority === "Critical" &&
            settings.criticalAlerts
          ) {
            shouldSend = true;
          }

          if (shouldSend) {
            await sendEmail({
              to: settings.alertEmail,
              subject: `🚨 ${log.priority} Threat Detected`,
              html: threatAlertTemplate(log),
            });

            console.log(
              `📧 Alert sent to ${settings.alertEmail} for ${log.threatType}`
            );
          }
        }
      } catch (err) {
        console.error(
          "Email Alert Failed:",
          err.message
        );
      }
    }
  }

  // Step 5 - Prepare logs for MongoDB
  const logsToSave = analyzedLogs.map((log) => ({
    ...log,
    source: metadata.source || log.source || "Apache",
    uploadedBy,
    sourceFile: metadata.sourceFile || "Live Monitoring",
    uploadBatchId: metadata.uploadBatchId || Date.now().toString(),
  }));

  // Step 6 - Save logs
  try {
    if (logsToSave.length > 0) {
      await Log.insertMany(logsToSave);
    }
  } catch (err) {
    console.error(
      "MongoDB Save Failed:",
      err.message
    );
    throw err;
  }

  return analyzedLogs;
  
};

module.exports = {
  analyzeLogs,
};