export interface ContactDetail {
  _id?: string;
  title: string;
  text: string;
  iconRef: string;
  isActive: boolean;
}

export interface SocialHandle {
  _id?: string;
  url: string;
  title: string;
  iconRef: string;
  isActive: boolean;
}

export interface FormField {
  title: string;
  placeholder: string;
}

export interface ContactPage {
  _id?: string;
  pageHeaderForeground: string;
  pageHeaderBackground: string;
  descriptionIntro: string;
  descriptionLongContent: string;
  contactDetails: ContactDetail[];
  formLabels: FormField[];
  socials: SocialHandle[];
}
