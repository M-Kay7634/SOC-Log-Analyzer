const fs = require("fs");

// Apache Common Log Format Regex
const regex =
  /^(\S+) \S+ \S+ \[([^\]]+)\] "(\S+) (.*?) (\S+)" (\d{3}) (\d+)/;

// Parse a single Apache log line
const parseApacheLine = (line) => {
  const match = line.match(regex);

  if (!match) {
    return null;
  }

  return {
    ip: match[1],
    timestamp: match[2],
    method: match[3],
    url: match[4],
    protocol: match[5],
    status: Number(match[6]),
    size: Number(match[7]),
  };
};

// Parse a complete Apache log file
const parseApacheLog = (filePath) => {
  const data = fs.readFileSync(filePath, "utf8");

  return data
    .split("\n")
    .map(parseApacheLine)
    .filter(Boolean);
};

module.exports = {
  parseApacheLog,
  parseApacheLine,
};