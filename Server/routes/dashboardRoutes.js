import express from "express";

import auth from "../middleware/auth.js";
import authorize from "../middleware/role.js";

import { ROLES } from "../constants/roles.js";

import {
  dashboardStats,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get(
  "/stats",
  auth,
  authorize(ROLES.ADMIN),
  dashboardStats
);

export default router;