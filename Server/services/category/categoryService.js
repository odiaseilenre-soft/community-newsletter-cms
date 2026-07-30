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



export const getCategories = async (query) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sort = "createdAt",
    order = "desc",
    active,
  } = query;

  const filter = {};

  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  if (active !== undefined) {
    filter.isActive = active === "true";
  }

  const sortOption = {
    [sort]: order === "asc" ? 1 : -1,
  };

  const skip = (Number(page) - 1) * Number(limit);

  const [categories, total] = await Promise.all([
    Category.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit)),

    Category.countDocuments(filter),
  ]);

  return {
    categories,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getCategoryById = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return category;
};


// implement updateCategory
export const updateCategory = async (id, data) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  // If the name is changing, ensure it is unique
  if (data.name && data.name !== category.name) {
    const existingCategory = await Category.findOne({
      name: data.name,
      _id: { $ne: id },
    });

    if (existingCategory) {
      throw new AppError("Category name already exists", 409);
    }

    category.name = data.name;
    category.slug = slugify(data.name, {
      lower: true,
      strict: true,
      trim: true,
    });
  }

  if (data.description !== undefined) {
    category.description = data.description;
  }

  if (data.isActive !== undefined) {
    category.isActive = data.isActive;
  }

  await category.save();

  return category;
};

export const deleteCategory = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  await category.deleteOne();

  return;
};