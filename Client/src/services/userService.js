import api from "./api";

export const getUsers = async (search = "") => {
  const response = await api.get("/users", {
    params: { search },
  });

  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);

  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.patch(
    `/users/${id}`,
    userData
  );

  return response.data;
};

export const toggleUserStatus = async (id) => {
  const response = await api.patch(
    `/users/${id}/status`
  );

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);

  return response.data;
};