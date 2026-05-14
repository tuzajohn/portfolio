export interface WorkExperience {
  _id?: string;
  category: 'work' | 'education' | 'project';
  jobProjectTitle: string;
  employer: string;
  description: string;
  fromDate: string;
  toDate?: string;
  period?: string;
  isCurrentRole?: boolean;
}
