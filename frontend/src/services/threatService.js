import API from "./api";

export const getAllThreats = async (
  page = 1,
  limit = 10
) => {
  const response = await API.get("/threats", {
    params: {
      page,
      limit,
    },
  });

  return response.data;
};