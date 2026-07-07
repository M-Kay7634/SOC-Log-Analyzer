const fs = require("fs");

const parseWindowsLine = (line) => {
  // Remove null characters (UTF-16 artifacts)
  line = line.replace(/\0/g, "").trim();

  if (
    !line ||
    line.startsWith("TimeCreated") ||
    line.startsWith("-----------")
  ) {
    return null;
  }

  // Date Time EventId Level Message
  const parts = line.split(/\s+/);

  if (parts.length < 5) {
    return null;
  }

  const timestamp = `${parts[0]} ${parts[1]}`;
  const eventId = Number(parts[2]);

  // Skip invalid rows
  if (Number.isNaN(eventId)) {
    return null;
  }

  const level = parts[3];
  const message = parts.slice(4).join(" ");

  const accountMatch = message.match(
    /Account Name:\s*([^\s]+)/i
  );

  const ipMatch = message.match(
    /\b(?:\d{1,3}\.){3}\d{1,3}\b/
  );

  return {
    source: "Windows",
    timestamp,
    eventId,
    level,
    message,
    account: accountMatch ? accountMatch[1] : null,
    ip: ipMatch ? ipMatch[0] : null,
  };
};

const parseWindowsLog = (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error("Windows log file not found.");
  }

  // Read raw buffer
  const buffer = fs.readFileSync(filePath);

  let content;

  // UTF-16 Little Endian (most Windows exports)
  if (buffer[0] === 0xff && buffer[1] === 0xfe) {
    content = buffer.toString("utf16le");
  } else {
    // UTF-8
    content = buffer.toString("utf8");
  }

  return content
    .split(/\r?\n/)
    .map(parseWindowsLine)
    .filter(Boolean);
};

module.exports = {
  parseWindowsLog,
  parseWindowsLine,
};