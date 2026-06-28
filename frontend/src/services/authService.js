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

export const forgotPassword = async (email) => {
  const response = await API.post(
    API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
    { email }
  );

  return response.data;
};

export const verifyOTP = async (email, otp) => {
  const response = await API.post(
    API_ENDPOINTS.AUTH.VERIFY_OTP,
    {
      email,
      otp,
    }
  );

  return response.data;
};

export const resetPassword = async (
  email,
  otp,
  newPassword
) => {
  const response = await API.post(
    API_ENDPOINTS.AUTH.RESET_PASSWORD,
    {
      email,
      otp,
      newPassword,
    }
  );

  return response.data;
};