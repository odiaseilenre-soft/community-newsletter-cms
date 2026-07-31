import api from "./api";

// Get all posts
export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

// Get single post
export const getPost = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

// Create post
export const createPost = async (formData) => {
  const response = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Update post
export const updatePost = async (id, formData) => {
  const response = await api.put(`/posts/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Delete post
export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};