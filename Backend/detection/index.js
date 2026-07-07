const detectSQLInjection = require("./apache/sqlInjection");
const detectDirectoryTraversal = require("./apache/directoryTraversal");
const detectFailedLogin = require("./apache/failedLogin");

const detectFailedSSHLogin = require("./linux/failedSSHLogin");
const detectRootLogin = require("./linux/rootLogin");
const detectSudoAbuse = require("./linux/sudoAbuse");

const detectFailedLogon = require("./windows/failedLogon");
const detectSuccessfulLogon = require("./windows/successfulLogon");
const detectAccountLockout = require("./windows/accountLockout");
const detectNewUserCreated = require("./windows/newUserCreated");
const detectPrivilegedLogon = require("./windows/privilegedLogon");

const detectSuspiciousIP = require("./common/suspiciousIP");

const detectThreats = (log, source = "Apache") => {
  let detectors = [];

  switch (source) {
    case "Apache":
      detectors = [
        () => detectSQLInjection(log.url || ""),
        () => detectDirectoryTraversal(log.url || ""),
        () => detectFailedLogin(log),
      ];
      break;

    case "Linux":
      detectors = [
        () => detectFailedSSHLogin(log),
        () => detectRootLogin(log),
        () => detectSudoAbuse(log),
      ];
      break;

    case "Windows":
      detectors = [
        () => detectFailedLogon(log),
        () => detectSuccessfulLogon(log),
        () => detectAccountLockout(log),
        () => detectNewUserCreated(log),
        () => detectPrivilegedLogon(log),
      ];
      break;

    default:
      detectors = [];
  }

  for (const detector of detectors) {
    const result = detector();

    if (result.detected) {
      return {
        threat: true,
        threatType: result.type,
        severity: result.severity,
        mitreTechnique: result.mitre,
        description: result.description,
      };
    }
  }

  const suspicious = detectSuspiciousIP(log);

  if (suspicious.detected) {
    return {
      threat: true,
      threatType: suspicious.type,
      severity: suspicious.severity,
      mitreTechnique: suspicious.mitre,
      description: suspicious.description,
    };
  }

  return {
    threat: false,
    threatType: null,
    severity: null,
    mitreTechnique: null,
    description: null,
  };
};

module.exports = detectThreats;