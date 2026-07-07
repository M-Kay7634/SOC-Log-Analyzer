const threatScores = Object.freeze({
  "SQL Injection": {
    score: 90,
    priority: "Critical",
    severity:"High",
  },

  "Directory Traversal": {
    score: 85,
    priority: "Critical",
    severity:"High",
  },

  "Failed Login": {
    score: 40,
    priority: "Medium",
    severity:"Medium",
  },

  "Brute Force": {
    score: 75,
    priority: "High",
    severity:"High",
  },

  "Suspicious IP": {
    score: 20,
    priority: "Low",
    severity:"Low",
  },
  "Failed SSH Login": {
    score: 45,
    priority: "Medium",
  },

  "Root Login": {
    score: 80,
    priority: "High",
  },

  "Sudo Abuse": {
    score: 75,
    priority: "High",
  },

  "Failed Windows Logon": {
    score: 45,
    priority: "Medium",
  },

  "Successful Windows Logon": {
    score: 15,
    priority: "Low",
  },

  "Account Lockout": {
    score: 70,
    priority: "High",
  },

  "New User Created": {
    score: 80,
    priority: "High",
  },

  "Privileged Logon": {
    score: 95,
    priority: "Critical",
  },
});

const calculateThreatScore = (threatType) => {
  threatType = (threatType || "").trim();
  if (!threatType) {
    return {
      threatScore: 0,
      priority: "None",
      severity: "None",
    };
  }

  const threat = threatScores[threatType];

  return {
    threatScore: threat?.score || 0,
    priority: threat?.priority || "Unknown",
    severity: threat?.severity || "None",
  };
};

module.exports = calculateThreatScore;