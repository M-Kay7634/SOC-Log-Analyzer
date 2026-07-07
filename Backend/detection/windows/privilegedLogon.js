const detectPrivilegedLogon = (log) => {
  if (log.eventId === 4672) {
    return {
      detected: true,
      type: "Privileged Logon",
      severity: "Critical",
      mitre: "T1078",
      description:
        "Special privileges assigned during logon.",
    };
  }

  return {
    detected: false,
  };
};

module.exports = detectPrivilegedLogon;