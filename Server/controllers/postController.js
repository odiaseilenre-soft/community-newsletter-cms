import asyncHandler from "../utils/asyncHandler.js";

import {
  createPost as createPostService,
  getPosts as getPostsService,
  getPostById as getPostByIdService,
  getPostBySlug as getPostBySlugService,
  updatePost as updatePostService,
  deletePost as deletePostService,
} from "../services/post/postService.js";

export const createPost = asyncHandler(async (req, res) => {
  // ===== Debug Logs =====
  console.log("========== CREATE POST ==========");
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);
  console.log("===============================");

  const post = await createPostService(
    {
      ...req.body,
      featuredImage: req.file
        ? `/uploads/images/${req.file.filename}`
        : null,
    },
    req.user.id
  );

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: post,
  });
});

export const getPosts = asyncHandler(async (req, res) => {
  const result = await getPostsService(req.query);

  res.status(200).json({
    success: true,
    message: "Posts retrieved successfully",
    data: result.posts,
    pagination: result.pagination,
  });
});

export const getPostById = asyncHandler(async (req, res) => {
  const post = await getPostByIdService(req.params.id);

  res.status(200).json({
    success: true,
    message: "Post retrieved successfully",
    data: post,
  });
});

export const getPostBySlug = asyncHandler(async (req, res) => {
  const result = await getPostBySlugService(req.params.slug);

  res.status(200).json({
    success: true,
    message: "Post retrieved successfully",
    data: result,
  });
});

export const updatePost = asyncHandler(async (req, res) => {
  const post = await updatePostService(
    req.params.id,
    {
      ...req.body,
      ...(req.file && {
        featuredImage: `/uploads/images/${req.file.filename}`,
      }),
    }
  );

  res.status(200).json({
    success: true,
    message: "Post updated successfully",
    data: post,
  });
});

export const deletePost = asyncHandler(async (req, res) => {
  await deletePostService(req.params.id);

  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});