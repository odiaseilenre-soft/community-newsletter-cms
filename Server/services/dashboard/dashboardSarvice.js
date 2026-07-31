import Post from "../../models/Post.js";
import Category from "../../models/Category.js";

export const getDashboardStats = async () => {
  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    totalCategories,
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
    recentPosts,
  };
};