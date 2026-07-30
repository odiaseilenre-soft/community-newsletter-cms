import { body } from "express-validator";

export const createCategoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Category name must be between 2 and 50 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 250 })
    .withMessage("Description cannot exceed 250 characters"),
];

export const updateCategoryValidator = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Category name must be between 2 and 50 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 250 })
    .withMessage("Description cannot exceed 250 characters"),
];


export const updateCategoryValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty"),

  body("description")
    .optional()
    .trim(),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false"),
];