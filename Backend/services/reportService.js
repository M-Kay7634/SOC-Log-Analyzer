const Report = require("../models/Report");

const saveReport = async ({
  userId,
  format,
  totalLogs,
  severity,
  threatType,
}) => {
  return await Report.create({
    generatedBy: userId,
    format,
    totalLogs,
    severity: severity || "All",
    threatType: threatType || "All",
  });
};

module.exports = {
  saveReport,
};