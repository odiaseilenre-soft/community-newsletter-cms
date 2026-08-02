import User from "../../models/User.js";

/**
 * Get all users
 */
export const getUsers = async (search = "") => {
  const filter = {};

  if (search) {
    filter.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { username: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  return await User.find(filter)
    .select("-refreshTokenHash")
    .sort({ createdAt: -1 });
};

/**
 * Get a single user by ID
 */
export const getUserById = async (id) => {
  return await User.findById(id)
    .select("-refreshTokenHash");
};

/**
 * Update a user
 */
export const updateUser = async (id, data) => {
  const updates = {
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    email: data.email,
    role: data.role,
  };

  return await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).select("-refreshTokenHash");
};

/**
 * Delete a user
 */
export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

/**
 * Activate or deactivate a user
 */
export const toggleUserStatus = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  user.isActive = !user.isActive;

  await user.save();

  return user;
};