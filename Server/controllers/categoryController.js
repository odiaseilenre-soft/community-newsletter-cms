import asyncHandler from "../utils/asyncHandler.js";

import {
  createCategory as createCategoryService,
  getCategories as getCategoriesService,
  getCategoryById as getCategoryByIdService,
  updateCategory as updateCategoryServices,
  deleteCategory as deleteCategoryService
} from "../services/category/categoryService.js";

export const createCategory = asyncHandler(async (req, res) => {
  const category = await createCategoryService(req.body);

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

export const getCategories = asyncHandler(async (req, res) => {
  const result = await getCategoriesService(req.query);

  res.status(200).json({
    success: true,
    message: "Categories retrieved successfully",
    data: result.categories,
    pagination: result.pagination,
  });
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await getCategoryByIdService(req.params.id);

  res.status(200).json({
    success: true,
    message: "Category retrieved successfully",
    data: category,
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await updateCategoryService(
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: category,
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  await deleteCategoryService(req.params.id);

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});