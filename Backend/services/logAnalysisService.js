const { lookupIP } = require("./geoipService");
const { sendEmail } = require("./email/emailService");
const { threatAlertTemplate } = require("./email/templates");
const Log = require("../models/Log");
const detectThreats = require("../detection");
const correlateThreats = require("../correlation");
const calculateThreatScore = require("../scoring/threatScoring");

const analyzeLogs = async (logs, uploadedBy, metadata = {}) => {

  // Step 1 - Detect threats
  let analyzedLogs = logs.map((log) => ({
    ...log,
    ...detectThreats(log),
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
  for (const log of analyzedLogs) {
    const geo = lookupIP(log.ip);

    log.country = geo.country;
    log.region = geo.region;
    log.city = geo.city;
    log.timezone = geo.timezone;
    if (
      log.threat &&
      (log.priority === "High" ||
        log.priority === "Critical")
    ) {
      try {
        const Settings = require("../models/Settings");

        const settings = await Settings.findOne();

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
              `📧 Alert sent to ${settings.alertEmail}`
            );
          }
        }

        console.log(
          `📧 Alert email sent for ${log.threatType}`
        );
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
    uploadedBy,
    sourceFile: metadata.sourceFile || "Live Monitoring",
    uploadBatchId:
      metadata.uploadBatchId || Date.now().toString(),
  }));

  // Step 6 - Save logs
  await Log.insertMany(logsToSave);

  return analyzedLogs;
};

module.exports = {
  analyzeLogs,
};