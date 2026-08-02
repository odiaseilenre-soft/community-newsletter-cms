import mongoose from "mongoose";
import { ROLES } from "../constants/roles.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },

    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please provide a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.MEMBER,
    },

    avatar: {
      type: String,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    refreshTokenHash: {
      type: String,
      default: null,
      select: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Text search index
userSchema.index({
  firstName: "text",
  lastName: "text",
  username: "text",
  email: "text",
});

// Virtual full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Remove sensitive fields when sending JSON responses
userSchema.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret.password;
    delete ret.refreshTokenHash;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("User", userSchema);