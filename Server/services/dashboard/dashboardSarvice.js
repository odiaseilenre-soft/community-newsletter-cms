import Post from "../../models/Post.js";
import Category from "../../models/Category.js";
import User from "../../models/User.js";

export const getDashboardStats = async () => {
  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    totalCategories,
    totalUsers,
    activeUsers,
    recentPosts,
  ] = await Promise.all([
    Post.countDocuments(),

    Post.countDocuments({
      status: "published",
    }),

    Post.countDocuments({
      status: "draft",
    }),

    Category.countDocuments(),

    User.countDocuments(),

    User.countDocuments({
      isActive: true,
    }),

    Post.find()
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .limit(5),
  ]);

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    totalCategories,
    totalUsers,
    activeUsers,
    recentPosts,
  };
};