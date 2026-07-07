const sqlPatterns = [
  /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,

  /\b(OR|AND)\b\s+\d+\s*=\s*\d+/i,

  /\bUNION\b.*\bSELECT\b/i,

  /\bSELECT\b.*\bFROM\b/i,

  /\bINSERT\b.*\bINTO\b/i,

  /\bUPDATE\b.*\bSET\b/i,

  /\bDELETE\b.*\bFROM\b/i,

  /\bDROP\b\s+\bTABLE\b/i,

  /\bEXEC(UTE)?\b/i,

  /\bSLEEP\s*\(/i,

  /\bBENCHMARK\s*\(/i,

  /\bINFORMATION_SCHEMA\b/i,

  /\bLOAD_FILE\s*\(/i,

  /\bINTO\s+OUTFILE\b/i,

  /\bWAITFOR\s+DELAY\b/i,

  /\bXP_CMDSHELL\b/i,
];

const detectSQLInjection = (url = "") => {
  try {
      url = decodeURIComponent(url).trim();
    } catch {
      url = url.trim();
    }
  for (const pattern of sqlPatterns) {
    if (pattern.test(url)) {
      return {
        detected: true,
        type: "SQL Injection",
        severity: "High",
        mitre: "T1190",
        description: "Request contains SQL keywords or payloads commonly associated with SQL Injection attempts.",
      };
    }
  }

  return {
    detected: false,
  };
};

module.exports = detectSQLInjection;