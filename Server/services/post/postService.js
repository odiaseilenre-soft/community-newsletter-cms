import slugify from "slugify";
import Post from "../../models/Post.js";
import Category from "../../models/Category.js";
import AppError from "../../utils/AppError.js";

export const createPost = async (
  {
    title,
    excerpt,
    content,
    featuredImage,
    category,
    status,
    tags,
    isFeatured,
  },
  author
) => {
  // Ensure category exists
  const existingCategory = await Category.findById(category);

  if (!existingCategory) {
    throw new AppError("Category not found", 404);
  }

  // Generate slug for duplicate check
  const slug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  // Ensure no existing post has the same slug
  const existingPost = await Post.findOne({ slug });

  if (existingPost) {
    throw new AppError("Post already exists", 409);
  }

  // Create post
  const post = await Post.create({
    title,
    excerpt,
    content,
    featuredImage,
    category,
    author,
    status,
    tags,
    isFeatured,
  });

  return post;
};

// implement getposts
export const getPosts = async (query) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sort = "createdAt",
    order = "desc",
    category,
    status,
    featured,
  } = query;

  const filter = {};

  // Search by title
  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  // Filter by category
  if (category) {
    filter.category = category;
  }

  // Filter by status
  if (status) {
    filter.status = status;
  }

  // Filter featured posts
  if (featured !== undefined) {
    filter.isFeatured = featured === "true";
  }

  const sortOption = {
    [sort]: order === "asc" ? 1 : -1,
  };

  const skip = (Number(page) - 1) * Number(limit);

  const [posts, total] = await Promise.all([
    Post.find(filter)
      .populate("category", "name slug")
      .populate("author", "firstName lastName email")
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit)),

    Post.countDocuments(filter),
  ]);

  return {
    posts,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

export const getPostById = async (id) => {
  const post = await Post.findById(id)
    .populate("category", "name slug")
    .populate("author", "firstName lastName email");

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  return post;
};

export const getPostBySlug = async (slug) => {
  const post = await Post.findOne({
    slug,
    status: "published",
  })
    .populate("category", "name slug")
    .populate("author", "firstName lastName email");

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  // Increment views
  post.views += 1;
  await post.save();

  // Get related posts
  const relatedPosts = await Post.find({
    _id: { $ne: post._id },
    category: post.category._id,
    status: "published",
  })
    .select("title slug excerpt featuredImage readTime publishedAt")
    .limit(3);

  return {
    post,
    relatedPosts,
  };
};
export const updatePost = async (id, updateData) => {
  const post = await Post.findById(id);

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  // If category is changing, ensure it exists
  if (updateData.category) {
    const category = await Category.findById(updateData.category);

    if (!category) {
      throw new AppError("Category not found", 404);
    }
  }

  // If title is changing, check for duplicate slug
  if (updateData.title) {
    const slug = slugify(updateData.title, {
      lower: true,
      strict: true,
      trim: true,
    });

    const existingPost = await Post.findOne({
      slug,
      _id: { $ne: id },
    });

    if (existingPost) {
      throw new AppError("Post already exists", 409);
    }
  }

  Object.assign(post, updateData);

  await post.save();

  return post;
};

export const deletePost = async (id) => {
  const post = await Post.findById(id);

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  await post.deleteOne();
};