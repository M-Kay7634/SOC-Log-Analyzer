import API from "./api";

export const getMonitoringStatus = async () => {
  const response = await API.get("/live/status");
  return response.data;
};

export const saveMonitoringConfig = async (config) => {
  const response = await API.post("/live/config", config);
  return response.data;
};

export const startMonitoring = async () => {
  const response = await API.post("/live/start");
  return response.data;
};

export const stopMonitoring = async () => {
  const response = await API.post("/live/stop");
  return response.data;
};