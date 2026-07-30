import express from "express";
import auth from "../middleware/auth.js";
import authorize from "../middleware/role.js";
import validate from "../middleware/validate.js";

import {
  createCategoryValidator,
  updateCategoryValidator,
} from "../validators/categoryValidator.js";

import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);

router.post(
  "/",
  auth,
  authorize(ROLES.ADMIN),
  createCategoryValidator,
  validate,
  createCategory
);

router.patch(
  "/:id",
  auth,
  authorize(ROLES.ADMIN),
  updateCategoryValidator,
  validate,
  updateCategory
);

router.delete(
  "/:id",
  auth,
  authorize(ROLES.ADMIN),
  deleteCategory
);

export default router;