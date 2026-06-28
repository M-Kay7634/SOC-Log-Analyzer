import API from "./api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const uploadLog = async (file) => {
  const formData = new FormData();

  formData.append("logFile", file);

  const response = await API.post(
    API_ENDPOINTS.LOGS.UPLOAD,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};