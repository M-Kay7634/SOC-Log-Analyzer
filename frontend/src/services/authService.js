import API from "./api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const loginUser = async (credentials) => {
  const response = await API.post(
    API_ENDPOINTS.AUTH.LOGIN,
    credentials
  );

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await API.post(
    API_ENDPOINTS.AUTH.REGISTER,
    userData
  );

  return response.data;
};