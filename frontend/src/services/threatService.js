import API from "./api";

export const getAllThreats = async () => {
  const response = await API.get("/threats");
  return response.data;
};