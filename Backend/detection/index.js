
const detectSQLInjection = require("./sqlInjection");
const detectDirectoryTraversal = require("./directoryTraversal");

const detectThreats = (log) => {
  const sqlResult = detectSQLInjection(log.url);
  const traversalResult = detectDirectoryTraversal(log.url);

  // SQL Injection has higher priority
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

  // No Threat
  return {
    threat: false,
    threatType: null,
    severity: null,
    mitreTechnique: null,
    description: null,
  };
};

module.exports = detectThreats;