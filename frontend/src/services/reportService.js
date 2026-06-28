import API from "./api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const getReportSummary = async () => {
  const response = await API.get(
    API_ENDPOINTS.DASHBOARD.SUMMARY
  );
  return response.data;
};

export const getReportLogs = async (filters) => {
  const response = await API.get("/logs", {
    params: filters,
  });
  return response.data;
};