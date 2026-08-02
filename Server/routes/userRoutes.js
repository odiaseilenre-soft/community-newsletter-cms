import express from "express";

import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  toggleUserStatus,
} from "../controllers/userController.js";

import auth from "../middleware/auth.js";
import { authorize } from "../middleware/authorize.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

// All routes require authentication
router.use(auth);

// Admin only routes
router.get("/", authorize(ROLES.ADMIN), getUsers);

router.get("/:id", authorize(ROLES.ADMIN), getUserById);

router.patch("/:id", authorize(ROLES.ADMIN), updateUser);

router.patch("/:id/status", authorize(ROLES.ADMIN), toggleUserStatus);

router.delete("/:id", authorize(ROLES.ADMIN), deleteUser);

export default router;