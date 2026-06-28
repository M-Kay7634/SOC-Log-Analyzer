export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",

    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_OTP: "/auth/verify-otp",
    RESET_PASSWORD: "/auth/reset-password",
  },

  LOGS: {
    UPLOAD: "/logs/upload",
  },

  DASHBOARD: {
    SUMMARY: "/dashboard/summary",
    DISTRIBUTION: "/dashboard/threat-distribution",
    TOP_IPS: "/dashboard/top-ips",
    TIMELINE: "/dashboard/timeline",
    RECENT_THREATS: "/dashboard/recent-threats",
  },
};