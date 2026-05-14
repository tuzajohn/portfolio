import { Schema, model } from 'mongoose';

const PortfolioItemSchema = new Schema({
  title: { type: String, required: true },
  projectType: { type: String, default: '' },
  client: { type: String, default: '' },
  technologies: { type: String, default: '' },
  previewUrl: { type: String, default: '' },
  thumbnailUrl: { type: String, required: true },
  contentType: { type: String, enum: ['image', 'video', 'youtube', 'carousel'], default: 'image' },
  mediaUrls: { type: [String], default: [] },
  description: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true }
}, { timestamps: true });

export const PortfolioItem = model('PortfolioItem', PortfolioItemSchema);
