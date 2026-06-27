const traversalPatterns = [
  /\.\.\//,
  /\.\.\\/,
  /etc\/passwd/i,
  /etc\/shadow/i,
  /windows\/system32/i,
  /boot\.ini/i,
  /win\.ini/i,
];

const detectDirectoryTraversal = (url) => {
  for (const pattern of traversalPatterns) {
    if (pattern.test(url)) {
      return {
        detected: true,
        type: "Directory Traversal",
        severity: "High",
        mitre: "T1006",
        description: "Possible Directory Traversal attack detected",
      };
    }
  }

  return {
    detected: false,
  };
};

module.exports = detectDirectoryTraversal;