import asyncHandler from "../utils/asyncHandler.js";
import * as userService from "../services/user/userService.js";

/**
 * Get all users
 */
export const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getUsers(req.query.search);

  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * Get one user
 */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Update user
 */
export const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
});

/**
 * Delete user
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await userService.deleteUser(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

/**
 * Activate / Deactivate user
 */
export const toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await userService.toggleUserStatus(req.params.id);

  res.status(200).json({
    success: true,
    message: `User ${user.isActive ? "activated" : "deactivated"} successfully`,
    data: user,
  });
});