import API from "./api";

export const getSummary = async () => {
  const response = await API.get("/dashboard/summary");
  return response.data;
};

export const getThreatDistribution = async () => {
  const response = await API.get("/dashboard/threat-distribution");
  return response.data;
};

export const getTopIPs = async () => {
  const response = await API.get("/dashboard/top-ips");
  return response.data;
};

export const getTimeline = async () => {
  const response = await API.get("/dashboard/timeline");
  return response.data;
};