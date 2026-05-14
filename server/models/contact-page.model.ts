import { Schema, model } from 'mongoose';

const ContactPageSchema = new Schema({
  pageHeaderForeground: { type: String, default: '' },
  pageHeaderBackground: { type: String, default: '' },
  descriptionIntro: { type: String, default: '' },
  descriptionLongContent: { type: String, default: '' },
  contactDetails: [{
    title: String,
    text: String,
    iconRef: String,
    isActive: { type: Boolean, default: true }
  }],
  formLabels: [{
    title: String,
    placeholder: String
  }],
  socials: [{
    url: String,
    title: String,
    iconRef: String,
    isActive: { type: Boolean, default: true }
  }]
}, { timestamps: true });

export const ContactPage = model('ContactPage', ContactPageSchema);
