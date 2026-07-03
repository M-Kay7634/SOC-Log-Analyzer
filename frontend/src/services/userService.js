import API from "./api";

export const getAllUsers = async () => {
  const response = await API.get("/users");
  return response.data;
};
export const updateUserRole = async (id, role) => {
  const response = await API.patch(`/users/${id}/role`, {
    role,
  });
  return response.data;
};
export const getMyActivity = async () => {
  const { data } = await API.get("/users/me/activity");
  return data;
};