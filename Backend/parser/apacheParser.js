const fs = require("fs");

// Parse Apache Log File
const parseApacheLog = (filePath) => {
  // Read complete file
  const data = fs.readFileSync(filePath, "utf8");

  // Split into lines
  const lines = data.split("\n");

  const logs = [];

  // Regular Expression for Apache Common Log Format
  const regex =
    /^(\S+) \S+ \S+ \[([^\]]+)\] "(\S+) (.*?) (\S+)" (\d{3}) (\d+)/;

  for (const line of lines) {
    const match = line.match(regex);

    if (match) {
      logs.push({
        ip: match[1],
        timestamp: match[2],
        method: match[3],
        url: match[4],
        protocol: match[5],
        status: Number(match[6]),
        size: Number(match[7]),
      });
    }
  }

  return logs;
};

module.exports = parseApacheLog;