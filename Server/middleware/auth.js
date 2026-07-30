import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import User from "../models/User.js";
import { verifyAccessToken } from '../services/auth/tokenService.js';

const auth = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (
    authHeader &&
    authHeader.startsWith("Bearer ")
  ) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    throw new AppError("Authentication required", 401);
  }

  const decoded = verifyAccessToken(token);

  const user = await User.findById(decoded.userId).select(
    "-password -refreshTokenHash"
  );

  if (!user) {
    throw new AppError("User not found", 401);
  }

  if (!user.isActive) {
    throw new AppError("Account has been disabled", 403);
  }

  req.user = user;

  next();
});

export default auth;