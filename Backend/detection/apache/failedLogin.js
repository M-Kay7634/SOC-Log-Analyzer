const detectFailedLogin = (log = {}) => {
  const url = (log.url || "").toLowerCase();
  const method = (log.method || "").toUpperCase();
  const status = Number(log.status);
  const message = (log.message || "").toLowerCase();

  const isLoginEndpoint =
    url.includes("login") ||
    url.includes("signin") ||
    url.includes("auth");

  const isPostRequest = method === "POST";

  const isUnauthorized =
    status === 401 ||
    status === 403;

  const isLinuxFailure =
    message.includes("failed password") ||
    message.includes("authentication failure");

  const isWindowsFailure =
    message.includes("logon failure") ||
    message.includes("failed logon");

  if ((isLoginEndpoint && isPostRequest && isUnauthorized) || isLinuxFailure ||        isWindowsFailure)
  {
    return {
      detected: true,
      type: "Failed Login",
      severity: "Medium",
      mitre: "T1110",
      description: "Authentication attempt failed. Possible credential attack or unauthorized access attempt.",
    };
  }

  return {
    detected: false,
  };
};

module.exports = detectFailedLogin;