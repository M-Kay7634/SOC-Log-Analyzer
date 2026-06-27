const detectFailedLogin = (log) => {
  const isLoginEndpoint = log.url.toLowerCase().includes("login");
  const isPostRequest = log.method === "POST";
  const isUnauthorized = log.status === 401;

  if (isLoginEndpoint && isPostRequest && isUnauthorized) {
    return {
      detected: true,
      type: "Failed Login",
      severity: "Medium",
      mitre: "T1110",
      description: "Failed login attempt detected",
    };
  }

  return {
    detected: false,
  };
};

module.exports = detectFailedLogin;