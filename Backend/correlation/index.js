const detectBruteForce = require("./bruteForce");

const correlateThreats = (logs) => {
  return detectBruteForce(logs);
};

module.exports = correlateThreats;