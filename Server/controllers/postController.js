import asyncHandler from "../utils/asyncHandler.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";

import {
  createPost as createPostService,
  getPosts as getPostsService,
  getPostById as getPostByIdService,
  getPostBySlug as getPostBySlugService,
  updatePost as updatePostService,
  deletePost as deletePostService,
} from "../services/post/postService.js";

export const createPost = asyncHandler(async (req, res) => {
  console.log("========== CREATE POST ==========");
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);
  console.log("===============================");

  let featuredImage = null;
  let featuredImagePublicId = null;

  if (req.file) {
    const result = await uploadToCloudinary(
      req.file.buffer,
      "community-newsletter/posts"
    );

    featuredImage = result.secure_url;
    featuredImagePublicId = result.public_id;

    console.log("Cloudinary Image URL:", featuredImage);
    console.log("Cloudinary Public ID:", featuredImagePublicId);
  }

  const post = await createPostService(
    {
      ...req.body,
      featuredImage,
      featuredImagePublicId,
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
  let featuredImage = null;
  let featuredImagePublicId = null;

  // Upload new image to Cloudinary if one was provided
  if (req.file) {
    const result = await uploadToCloudinary(
      req.file.buffer,
      "community-newsletter/posts"
    );

    featuredImage = result.secure_url;
    featuredImagePublicId = result.public_id;

    console.log("Cloudinary Image URL:", featuredImage);
    console.log(
      "Cloudinary Public ID:",
      featuredImagePublicId
    );
  }

  const post = await updatePostService(
    req.params.id,
    {
      ...req.body,
      ...(req.file && {
        featuredImage,
        featuredImagePublicId,
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