const detectSudoAbuse = (log) => {
  const message = (log.message || "").toLowerCase();

  if (
    message.includes("sudo") &&
    (
      message.includes("authentication failure") ||
      message.includes("incorrect password") ||
      message.includes("command")
    )
  ) {
    return {
      detected: true,
      type: "Sudo Abuse",
      severity: "Medium",
      mitre: "T1548",
      description: "Potential sudo privilege escalation activity detected.",
    };
  }

  return {
    detected: false,
  };
};

module.exports = detectSudoAbuse;