import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    excerpt: {
      type: String,
      trim: true,
      default: "",
    },

    content: {
      type: String,
      required: [true, "Post content is required"],
    },

    featuredImage: {
      type: String,
      default: null,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    readTime: {
      type: Number,
      default: 0,
    },

    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.pre("save", function () {
  // Generate slug
  if (this.isModified("title")) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      trim: true,
    });
  }

  // Calculate read time (≈200 words/minute)
  if (this.isModified("content")) {
    const plainText = this.content.replace(/<[^>]*>/g, "");
    const words = plainText
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    this.readTime = Math.max(1, Math.ceil(words / 200));
  }

  // Set publication date
  if (this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

export default mongoose.model("Post", postSchema);