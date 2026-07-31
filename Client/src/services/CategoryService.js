import api from "./api";

export const getCategories = async (params = {}) => {
  const response = await api.get("/categories", {
    params,
  });

  return response.data;
};