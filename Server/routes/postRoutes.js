import express from "express";
import auth from "../middleware/auth.js";
import authorize from "../middleware/role.js";
import validate from "../middleware/validate.js";

import { createPostValidator, updatePostValidator } from "../validators/postValidator.js";
import {
  createPost,
  getPosts,
  getPostBySlug,
  updatePost,
  deletePost
} from "../controllers/postController.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:slug", getPostBySlug);

router.post(
  "/",
  auth,
  authorize(ROLES.ADMIN),
  createPostValidator,
  validate,
  createPost
);

router.patch(
  "/:id",
  auth,
  authorize(ROLES.ADMIN),
  updatePostValidator,
  validate,
  updatePost
);

router.delete(
  "/:id",
  auth,
  authorize(ROLES.ADMIN),
  deletePost
);

export default router;