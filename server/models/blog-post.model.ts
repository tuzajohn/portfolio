import { Schema, model } from 'mongoose';

const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  excerpt: { type: String, default: '' },
  content: { type: String, default: '' },
  thumbnailUrl: { type: String, default: '' },
  publishedAt: { type: String, default: () => new Date().toISOString() },
  tags: { type: [String], default: [] },
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

export const BlogPost = model('BlogPost', BlogPostSchema);
