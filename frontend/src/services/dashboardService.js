import API from "./api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const getSummary = async () => {
  const response = await API.get(API_ENDPOINTS.DASHBOARD.SUMMARY);
  return response.data;
};

export const getThreatDistribution = async () => {
  const response = await API.get(API_ENDPOINTS.DASHBOARD.DISTRIBUTION);
  return response.data;
};

export const getTopIPs = async () => {
  const response = await API.get(API_ENDPOINTS.DASHBOARD.TOP_IPS);
  return response.data;
};

export const getTimeline = async () => {
  const response = await API.get(API_ENDPOINTS.DASHBOARD.TIMELINE);
  return response.data;
};