import API from "./api";

export const uploadLog = async (formData) => {
  const response = await API.post("/logs/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};