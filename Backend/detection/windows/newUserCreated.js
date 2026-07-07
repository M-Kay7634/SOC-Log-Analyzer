const detectNewUserCreated = (log) => {
  if (log.eventId === 4720) {
    return {
      detected: true,
      type: "New User Created",
      severity: "High",
      mitre: "T1136",
      description:
        "A new Windows user account was created.",
    };
  }

  return {
    detected: false,
  };
};

module.exports = detectNewUserCreated;