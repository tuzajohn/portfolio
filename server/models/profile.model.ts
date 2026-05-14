import { Schema, model } from 'mongoose';

const ProfileSchema = new Schema({
  name: { type: String, default: '' },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  latestWorkPosition: { type: String, default: '' },
  shortResume: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  address: { type: String, default: '' },
  primaryPhoneNumber: { type: String, default: '' },
  skype: { type: String, default: '' },
  languages: { type: String, default: '' },
  nationality: { type: String, default: '' },
  dateOfBirth: { type: String, default: '' },
  cvUrl: { type: String, default: '' }
}, { timestamps: true });

export const Profile = model('Profile', ProfileSchema);
