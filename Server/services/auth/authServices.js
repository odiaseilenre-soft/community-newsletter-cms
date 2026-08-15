import bcrypt from "bcrypt";
import User from "../../models/User.js";
import { generateAccessToken, generateRefreshToken, hashRefreshToken, verifyRefreshToken } from './tokenService.js';
import AppError from "../../utils/AppError.js";
import { AUTH } from "../../constants/auth.js";
//import hashToken from "../../utils/hashToken.js";

export const registerUser = async (userData) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
  } = userData;

  // Check if email already exists
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    throw new AppError("Email already exists", 409);
  }

  // Check if username already exists
  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
    throw new AppError("Username already exists", 409);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, AUTH.BCRYPT_SALT_ROUNDS);

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
  });

  // JWT Payload
  const payload = {
    userId: user._id.toString(),
    username: user.username,
    role: user.role,
  };

  // Generate tokens
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Hash refresh token before saving
 // const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
  //user.refreshToken = hashedRefreshToken;

  user.refreshTokenHash = hashRefreshToken(refreshToken);
  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};

// login user
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!user.isActive) {
    throw new AppError("Account has been disabled", 403);
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw new AppError("Invalid email or password", 401);
  }

  const payload = {
    userId: user._id.toString(),
    username: user.username,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

 //const hashedRefreshToken = await bcrypt.hash( refreshToken, AUTH.BCRYPT_SALT_ROUNDS);
 //user.refreshToken = hashedRefreshToken;

 user.refreshTokenHash = hashRefreshToken(refreshToken);

  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};

// create refresh user
export const refreshUser = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError("Unauthorized", 401);
  }

  // Verify the JWT
  const decoded = verifyRefreshToken(refreshToken);

  // Hash the incoming refresh token
  const hashedToken = hashRefreshToken(refreshToken);

  // Find the user with this refresh token
  const user = await User.findOne({
    _id: decoded.userId,
    refreshTokenHash: hashedToken,
  }).select("+refreshTokenHash");

  if (!user) {
    throw new AppError("Unauthorized", 401);
  }

  if (!user.isActive) {
    throw new AppError("Account disabled", 403);
  }

  const payload = {
    userId: user._id.toString(),
    username: user.username,
    role: user.role,
  };

  // Generate new tokens (rotation)
  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  // Store only the hash of the new refresh token
  user.refreshTokenHash = hashRefreshToken(newRefreshToken);

  await user.save();

  return {
    user,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

// Implement logout
export const logoutUser = async (refreshToken) => {
  // If there is no refresh token, the user is effectively logged out.
  if (!refreshToken) {
    return;
  }

  const hashedToken = hashRefreshToken(refreshToken);

  const user = await User.findOne({
    refreshTokenHash: hashedToken,
  }).select("+refreshTokenHash");

  // If no user is found, don't throw an error.
  // We still want logout to succeed.
  if (!user) {
    return;
  }

  user.refreshTokenHash = "";

  await user.save();
};
