const detectFailedSSHLogin = (log) => {
  const message = (log.message || "").toLowerCase();

  if (message.includes("failed password")) {
    return {
      detected: true,
      type: "Failed SSH Login",
      severity: "Medium",
      mitre: "T1110",
      description: "Failed SSH login attempt detected.",
    };
  }

  return {
    detected: false,
  };
};

module.exports = detectFailedSSHLogin;