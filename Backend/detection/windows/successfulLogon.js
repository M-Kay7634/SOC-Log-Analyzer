const detectSuccessfulLogon = (log) => {
  if (log.eventId === 4624) {
    return {
      detected: true,
      type: "Successful Windows Logon",
      severity: "Low",
      mitre: "T1078",
      description:
        "Successful Windows logon detected.",
    };
  }

  return {
    detected: false,
  };
};

module.exports = detectSuccessfulLogon;