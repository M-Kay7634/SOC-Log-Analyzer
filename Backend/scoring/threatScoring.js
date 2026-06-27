const threatScores = {
  "SQL Injection": {
    score: 90,
    priority: "Critical",
  },

  "Directory Traversal": {
    score: 85,
    priority: "Critical",
  },

  "Failed Login": {
    score: 40,
    priority: "Medium",
  },

  "Brute Force": {
    score: 75,
    priority: "High",
  },

  "Suspicious IP": {
    score: 20,
    priority: "Low",
  },
};

const calculateThreatScore = (threatType) => {
  if (!threatType) {
    return {
      threatScore: 0,
      priority: "None",
    };
  }

  return {
    threatScore: threatScores[threatType]?.score || 0,
    priority: threatScores[threatType]?.priority || "Unknown",
  };
};

module.exports = calculateThreatScore;