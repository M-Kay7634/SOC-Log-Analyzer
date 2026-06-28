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

export const exportCSV = async (filters) => {
  const response = await API.get(
    "/reports/export/csv",
    {
      params: filters,
      responseType: "blob",
    }
  );
  return response.data;
};

export const exportExcel = async (
  filters
) => {
  const response = await API.get(
    "/reports/export/excel",
    {
      params: filters,
      responseType: "blob",
    }
  );
  return response.data;
};

export const exportPDF = async (filters) => {
  const response = await API.get(
    "/reports/export/pdf",
    {
      params: filters,
      responseType: "blob",
    }
  );
  return response.data;
};