import mongoose, { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    tags: [
      {
        type: String,
      },
    ],

    excerpt: {
      type: String,
      required: true,
    },

    featuredImage: {
      url: String,
      public_id: String,
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = models.Blog || model("Blog", BlogSchema);

export default Blog;