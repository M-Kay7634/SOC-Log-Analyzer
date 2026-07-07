const detectSQLInjection = require("./sqlInjection");
const detectDirectoryTraversal = require("./directoryTraversal");
const detectFailedLogin = require("./failedLogin");
const detectSuspiciousIP = require("./suspiciousIP");

const detectThreats = (log) => {
  const url = log.url || "";
  const sqlResult = detectSQLInjection(url);
  const traversalResult = detectDirectoryTraversal(url);
  const failedLoginResult = detectFailedLogin(log);
  const suspiciousIPResult = detectSuspiciousIP(log);

  // SQL Injection (Highest Priority)
  if (sqlResult.detected) {
    return {
      threat: true,
      threatType: sqlResult.type,
      severity: sqlResult.severity,
      mitreTechnique: sqlResult.mitre,
      description: sqlResult.description,
    };
  }

  // Directory Traversal
  if (traversalResult.detected) {
    return {
      threat: true,
      threatType: traversalResult.type,
      severity: traversalResult.severity,
      mitreTechnique: traversalResult.mitre,
      description: traversalResult.description,
    };
  }

  // Failed Login
  if (failedLoginResult.detected) {
    return {
      threat: true,
      threatType: failedLoginResult.type,
      severity: failedLoginResult.severity,
      mitreTechnique: failedLoginResult.mitre,
      description: failedLoginResult.description,
    };
  }

  if (suspiciousIPResult.detected) {
    return {
      threat: true,
      threatType: suspiciousIPResult.type,
      severity: suspiciousIPResult.severity,
      mitreTechnique: suspiciousIPResult.mitre,
      description: suspiciousIPResult.description,
    };
  }

  // Safe Log
  return {
    threat: false,
    threatType: null,
    severity: null,
    mitreTechnique: null,
    description: null,
  };
};

module.exports = detectThreats;