const fs = require("fs");

// Parse a single Linux auth log line
const parseLinuxLine = (line) => {
  const regex =
    /^([A-Z][a-z]{2}\s+\d+\s+\d+:\d+:\d+)\s+(\S+)\s+([^\[]+)(?:\[\d+\])?:\s+(.*)$/;

  const match = line.match(regex);

  if (!match) {
    return null;
  }

  const message = match[4];

  const ipMatch = message.match(
    /\b(?:\d{1,3}\.){3}\d{1,3}\b/
  );

  return {
    timestamp: match[1],
    host: match[2],
    service: match[3].trim(),
    message,
    ip: ipMatch ? ipMatch[0] : "",
  };
};

// Parse an entire Linux log file
const parseLinuxLog = (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error("Linux log file not found.");
  }

  return fs
    .readFileSync(filePath, "utf8")
    .trim()
    .split(/\r?\n/)
    .map(parseLinuxLine)
    .filter(Boolean);
};

module.exports = {
  parseLinuxLog,
  parseLinuxLine,
};