const fs = require("fs");

// Parse a single Windows security log line
const parseWindowsLine = (line) => {
  const regex =
    /^(.+?)\s+EventID=(\d+)\s+Account=(\S+)\s+IP=(\S+)/;

  const match = line.match(regex);

  if (!match) {
    return null;
  }

  return {
    timestamp: match[1],
    eventId: Number(match[2]),
    account: match[3],
    ip: match[4],
    message: line,
  };
};

// Parse an entire Windows log file
const parseWindowsLog = (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error("Windows log file not found.");
  }

  return fs
    .readFileSync(filePath, "utf8")
    .trim()
    .split(/\r?\n/)
    .map(parseWindowsLine)
    .filter(Boolean);
};

module.exports = {
  parseWindowsLog,
  parseWindowsLine,
};