const detectRootLogin = (log) => {
  const message = (log.message || "").toLowerCase();

  if (
    message.includes("accepted password for root") ||
    message.includes("session opened for user root")
  ) {
    return {
      detected: true,
      type: "Root Login",
      severity: "High",
      mitre: "T1078",
      description: "Root account login detected.",
    };
  }

  return {
    detected: false,
  };
};

module.exports = detectRootLogin;