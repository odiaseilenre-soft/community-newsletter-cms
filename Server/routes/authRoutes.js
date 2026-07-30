import express from "express";

import { register, login, refresh, logout } from "../controllers/authController.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/authValidators.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  validate,
  register
);

router.post(
  "/login",
  loginValidator,
  validate,
  login
);

router.get('/refresh', refresh)

router.post("/logout", logout);

export default router;