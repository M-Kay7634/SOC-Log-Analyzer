const traversalPatterns = [
  /\.\.\//i,
  /\.\.\\/i,

  /%2e%2e%2f/i,
  /%2e%2e%5c/i,

  /etc\/passwd/i,
  /etc\/shadow/i,

  /windows\/system32/i,
  /system32/i,

  /boot\.ini/i,
  /win\.ini/i,

  /\.\.%252f/i,
  /\.\.%255c/i,
];

const detectDirectoryTraversal = (url = "") => {
  try {
    url = decodeURIComponent(url).trim();
  } catch {
    url = url.trim();
  }
  for (const pattern of traversalPatterns) {
    if (pattern.test(url)) {
      return {
        detected: true,
        type: "Directory Traversal",
        severity: "High",
        mitre: "T1006",
        description: "Request contains path traversal sequences or attempts to access sensitive system files.",
      };
    }
  }

  return {
    detected: false,
  };
};

module.exports = detectDirectoryTraversal;