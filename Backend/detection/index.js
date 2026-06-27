
const detectSQLInjection = require("./sqlInjection");
const detectDirectoryTraversal = require("./directoryTraversal");
const detectFailedLogin = require("./failedLogin");

const detectThreats = (log) => {
  const sqlResult = detectSQLInjection(log.url);
  const traversalResult = detectDirectoryTraversal(log.url);
  const failedLoginResult = detectFailedLogin(log);

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