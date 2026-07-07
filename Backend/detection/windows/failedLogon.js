const detectFailedLogon = (log) => {
  if (log.eventId === 4625) {
    return {
      detected: true,
      type: "Failed Windows Logon",
      severity: "Medium",
      mitre: "T1110",
      description:
        "Failed Windows logon attempt detected.",
    };
  }

  return {
    detected: false,
  };
};

module.exports = detectFailedLogon;