const BRUTE_FORCE_THRESHOLD = 5;
const detectBruteForce = (logs) => {
  const failedLoginCount = {};

  // Count failed logins per IP
  logs.forEach((log) => {
    if (log.threatType !== "Failed Login") {
      return;
    }

    const ip = log.ip || "Unknown";

    failedLoginCount[ip] =
      (failedLoginCount[ip] || 0) + 1;
  });

  // Convert repeated failed logins into Brute Force
  return logs.map((log) => {
    const ip = log.ip || "Unknown";
    if (
      log.threatType === "Failed Login" &&
      failedLoginCount[ip] >= BRUTE_FORCE_THRESHOLD
    ) {
      return {
        ...log,
        threatType: "Brute Force",
        severity: "High",
        priority: "High",
        mitreTechnique: "T1110",
        description:"Detected repeated failed authentication attempts from the same IP address, indicating a possible brute-force attack.",
      };
    }

    return log;
  });
};

module.exports = detectBruteForce;