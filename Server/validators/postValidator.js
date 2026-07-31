import { body } from "express-validator";

export const createPostValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 200 })
    .withMessage("Title must be between 5 and 200 characters"),

  body("excerpt")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Excerpt cannot exceed 500 characters"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category ID"),

  body("status")
    .optional()
    .isIn(["draft", "published"])
    .withMessage("Status must be either draft or published"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be true or false"),
];

export const updatePostValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage("Title must be between 5 and 200 characters"),

  body("excerpt")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Excerpt cannot exceed 500 characters"),

  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty"),

  body("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid category ID"),

  body("status")
    .optional()
    .isIn(["draft", "published"])
    .withMessage("Status must be either draft or published"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be true or false"),

  body("featuredImage")
    .optional({ nullable: true })
    .isString()
    .withMessage("Featured image must be a string"),
];