import { Schema, model } from 'mongoose';

const WorkExperienceSchema = new Schema({
  category: { type: String, enum: ['work', 'education', 'project'], default: 'work' },
  jobProjectTitle: { type: String, required: true },
  employer: { type: String, default: '' },
  description: { type: String, default: '' },
  fromDate: { type: String, required: true },
  toDate: { type: String, default: '' },
  period: { type: String, default: '' },
  isCurrentRole: { type: Boolean, default: false }
}, { timestamps: true });

export const WorkExperience = model('WorkExperience', WorkExperienceSchema);
