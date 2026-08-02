import api from "./api";

export const getPosts = async (params = {}) => {
  const response = await api.get("/posts", {
    params,
  });

  return response.data;
};

export const getPostBySlug = async (slug) => {
  const response = await api.get(`/posts/${slug}`);

  return response.data;
};

export const getPostById = async (id) => {
  const response = await api.get(`/posts/id/${id}`);

  return response.data;
};

export const createPost = async (formData) => {
  const response = await api.post(
    "/posts",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updatePost = async (id, formData) => {
  const response = await api.patch(
    `/posts/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);

  return response.data;
};