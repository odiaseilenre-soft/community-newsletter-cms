import asyncHandler from "../utils/asyncHandler.js";
import { createCategory as createCategoryService } from "../services/category/categoryService.js";

export const createCategory = asyncHandler(async (req, res) => {
  const category = await createCategoryService(req.body);

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});