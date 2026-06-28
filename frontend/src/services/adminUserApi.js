import api from "./api";

export const getAllUsersApi = async () => {
  const response = await api.get("/auth/users");
  return response.data;
};

export const deleteUserApi = async (id) => {
  const response = await api.delete(`/auth/users/${id}`);
  return response.data;
};

export const createUserApi = async (userData) => {
  const response = await api.post(
    "/auth/register",
    userData
  );

  return response.data;
};
export const getUserByIdApi = async (id) => {
  const response = await api.get(
    `/auth/users/${id}`
  );

  return response.data;
};

export const updateUserApi = async (
  id,
  userData
) => {
  const response = await api.put(
    `/auth/users/${id}`,
    userData
  );

  return response.data;
};