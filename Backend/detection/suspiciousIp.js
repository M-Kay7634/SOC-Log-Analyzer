const suspiciousIPs = new Set([
  "185.220.101.1",
  "45.33.32.156",
  "103.21.244.0",
]);

const detectSuspiciousIP = (log = {}) => {
  const ip = log.ip || "";

  // Ignore localhost
  if (ip === "127.0.0.1" || ip === "::1") {
    return { detected: false };
  }

  // Ignore common private ranges
  if (
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)
  ) {
    return { detected: false };
  }

  if (suspiciousIPs.has(ip)) {
    return {
      detected: true,
      type: "Suspicious IP",
      severity: "Low",
      mitre: "T1583",
      description:
        "Connection originated from an IP address flagged as suspicious.",
    };
  }

  return {
    detected: false,
  };
};

module.exports = detectSuspiciousIP;