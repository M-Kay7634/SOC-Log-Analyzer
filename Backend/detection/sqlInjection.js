const sqlPatterns = [
  /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
  /\b(OR|AND)\b\s+\d+=\d+/i,
  /\bUNION\b.*\bSELECT\b/i,
  /\bSELECT\b.*\bFROM\b/i,
  /\bINSERT\b.*\bINTO\b/i,
  /\bUPDATE\b.*\bSET\b/i,
  /\bDELETE\b.*\bFROM\b/i,
  /\bDROP\b\s+\bTABLE\b/i,
  /\bEXEC\b/i,
  /\bSLEEP\s*\(/i,
];

const detectSQLInjection = (url) => {
  for (const pattern of sqlPatterns) {
    if (pattern.test(url)) {
      return {
        detected: true,
        type: "SQL Injection",
        severity: "High",
        mitre: "T1190",
        description: "Possible SQL Injection attack detected",
      };
    }
  }

  return {
    detected: false,
  };
};

module.exports = detectSQLInjection;