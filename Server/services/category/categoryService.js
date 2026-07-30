import slugify from "slugify";
import Category from "../../models/Category.js";
import AppError from "../../utils/AppError.js";

export const createCategory = async ({ name, description }) => {
  const slug = slugify(name, {
    lower: true,
    strict: true,
    trim: true,
  });

  const existingCategory = await Category.findOne({
    $or: [
      { name },
      { slug },
    ],
  });

  if (existingCategory) {
    throw new AppError("Category already exists", 409);
  }

  const category = await Category.create({
    name,
    slug,
    description,
  });

  return category;
};