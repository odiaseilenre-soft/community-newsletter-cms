import express from "express";

import { createCategory } from "../controllers/categoryController.js";

import auth from "../middleware/auth.js";
import authorize from "../middleware/role.js";
import validate from "../middleware/validate.js";

import { createCategoryValidator } from "../validators/categoryValidator.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.post(
  "/",
  auth,
  authorize(ROLES.ADMIN),
  createCategoryValidator,
  validate,
  createCategory
);

export default router;