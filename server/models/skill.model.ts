import { Schema, model } from 'mongoose';

const SkillSchema = new Schema({
  name: { type: String, required: true },
  skillLevelPercentage: { type: Number, required: true, min: 0, max: 100 },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export const Skill = model('Skill', SkillSchema);
