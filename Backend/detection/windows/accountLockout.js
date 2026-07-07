const detectAccountLockout = (log) => {
  if (log.eventId === 4740) {
    return {
      detected: true,
      type: "Account Lockout",
      severity: "High",
      mitre: "T1110",
      description:
        "Windows account lockout detected.",
    };
  }

  return {
    detected: false,
  };
};

module.exports = detectAccountLockout;