const detectBruteForce = (logs) => {
  const failedLoginCount = {};

  // Count failed logins per IP
  logs.forEach((log) => {
    if (log.threatType === "Failed Login") {
      failedLoginCount[log.ip] =
        (failedLoginCount[log.ip] || 0) + 1;
    }
  });

  // Convert repeated failed logins into Brute Force
  return logs.map((log) => {
    if (
      log.threatType === "Failed Login" &&
      failedLoginCount[log.ip] >= 5
    ) {
      return {
        ...log,
        threatType: "Brute Force",
        severity: "High",
        mitreTechnique: "T1110",
        description:
          "Multiple failed login attempts detected from the same IP",
      };
    }

    return log;
  });
};

module.exports = detectBruteForce;