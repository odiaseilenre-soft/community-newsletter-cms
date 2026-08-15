import asyncHandler from "../utils/asyncHandler.js";
import { registerUser, refreshUser, loginUser, logoutUser } from "../services/auth/authServices.js";
import { refreshCookieOptions } from "../utils/cookieOptions.js";

export const register = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await registerUser(req.body);

  res.cookie("jwt", refreshToken, refreshCookieOptions);

  res.status(201).json({
    success: true,
    message: "Registration successful",
    accessToken,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await loginUser(req.body);

  res.cookie("jwt", refreshToken, refreshCookieOptions);

  res.status(200).json({
    success: true,
    message: "Login successful",
    accessToken,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.jwt;

  const {
    user,
    accessToken,
    refreshToken: newRefreshToken,
  } = await refreshUser(refreshToken);

  res.cookie("jwt", newRefreshToken, refreshCookieOptions);

  res.status(200).json({
    success: true,
    accessToken,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.jwt;

  await logoutUser(refreshToken);

  res.clearCookie("jwt", refreshCookieOptions);

  res.sendStatus(204);
});