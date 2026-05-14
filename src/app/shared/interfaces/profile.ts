export interface ProfileData {
  _id?: string;
  name: string;
  firstName: string;
  lastName: string;
  latestWorkPosition: string;
  shortResume: string;
  imageUrl: string;
  address: string;
  primaryPhoneNumber: string;
  skype: string;
  languages: string;
  nationality: string;
  dateOfBirth?: string;
  age?: number;
  cvUrl?: string;
}

export type AboutProfile = Pick<
  ProfileData,
  '_id' | 'firstName' | 'lastName' | 'address' | 'primaryPhoneNumber' |
  'skype' | 'languages' | 'nationality' | 'dateOfBirth' | 'age'
>;
