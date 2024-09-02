import { Injectable } from '@angular/core';
import { createClient } from 'contentful';
import { FieldsRoot } from '../../interfaces/contentful/rootFields';
import { ContactDetails } from '../../interfaces/contentful/contactDetails';
import { FormFields } from '../../interfaces/contentful/formFields';
import { SocialHandle } from '../../interfaces/contentful/socialHandles';
import { AboutProfile, ProfileData } from '../../interfaces/contactInterfaces/profileData';
import { ProfileImage } from '../../interfaces/contactInterfaces/profileImage';
import { WorkExperience } from '../../interfaces/contentful/work-experience';
import { SkillListing } from '../../interfaces/contentful/skill-listing';
import { DateHelpers } from '../../interfaces/helpers/date-helpers';
import { BlogPost } from '../../interfaces/contentful/blog-post';


const CONFIG = {
  space: '9w8s7scmuhwg',
  accessToken: 'iUZsO2KAWRsG_ChwxFDxPIrrhVFDiCbK8qnYVd99I8o',

  contentTypeIds: {
    contactContent: '2SlDeT1TCCOn80K8FZ04TD',
    profileData: '5bBRto8vxOO1QVgEDjStS',
    workExperienceContents: 'experienceHistoryModel',
    skillsModelContents: 'skillsModel',
    blogPost: 'blogPost'
  },
};


@Injectable({
  providedIn: 'root'
})
export class ContentfullService {
  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken
  });


  constructor(private dateHelpers: DateHelpers) { }

  async getFields(): Promise<FieldsRoot> {
    return await this.cdaClient.getEntry(CONFIG.contentTypeIds.contactContent)
      .then((entry) => {

        let fieldRoot: FieldsRoot = {
          contactDetails: entry.fields['contactDetails'] as unknown as ContactDetails[],
          descriptionIntro: entry.fields['descriptionIntro'] as unknown as String,
          descriptionLongContent: entry.fields['descriptionLongContent'] as unknown as String,
          pageHeaderBackground: entry.fields['pageHeaderBackground'] as unknown as String,
          pageHeaderForeground: entry.fields['pageHeaderForeground'] as unknown as String,
          formLabels: entry.fields['formLabels'] as unknown as FormFields[],
          socials: entry.fields['socials'] as unknown as SocialHandle[]
        }
        return fieldRoot;
      })
  }

  async getProfileInformation(): Promise<ProfileData> {
    return await this.cdaClient.getEntry(CONFIG.contentTypeIds.profileData)
      .then((entry) => {

        let data: ProfileData = {
          profileImage: entry.fields['profileImage'] as unknown as ProfileImage,
          name: entry.fields['name'] as unknown as String,
          latestWorkPosition: entry.fields['latestWorkPosition'] as unknown as String,
          shortResume: entry.fields['shortResume'] as unknown as String
        }

        return data;
      })
  }


  async getAboutProfileInformation(): Promise<AboutProfile> {
    return await this.cdaClient.getEntry(CONFIG.contentTypeIds.profileData)
      .then((entry: any) => {

        let data: AboutProfile = {
          address: entry.fields['address'] as unknown as String,
          firstName: entry.fields['firstName'] as unknown as String,
          languages: entry.fields['languages'] as unknown as String,
          skype: entry.fields['skype'] as unknown as String,
          primaryPhoneNumber: entry.fields['primaryPhoneNumber'] as unknown as String,
          lastName: entry.fields['lastName'] as unknown as String,
          dateOfBirth: new Date(entry.fields['dateOfBirth'] ?? new Date().toLocaleDateString()),
          nationality: entry.fields['nationality'] as unknown as String
        }

        if (data.dateOfBirth) {
          data.age = this.dateHelpers.calculateAge(data.dateOfBirth);
        }
        return data;
      })

  }

  async getAsset(assetId: string): Promise<String> {
    return await this.cdaClient.getAsset(assetId)
      .then(img => {
        let url: String = img['fields']?.['file']?.['url'] as unknown as String;
        return url;
      });
  }

  async getExperiences(query?: object): Promise<WorkExperience[]> {
    return await this.cdaClient.getEntries(Object.assign({
      content_type: CONFIG.contentTypeIds.workExperienceContents
    }, query))
      .then(res => res.items.map(this.convertToWorkExperience));
  }

  async getSkills(query?: object): Promise<SkillListing[]> {
    return await this.cdaClient.getEntries(Object.assign({
      content_type: CONFIG.contentTypeIds.skillsModelContents
    }, query))
      .then(res => res.items.map(this.convertToSkillListing));
  }

  async getPosts(query?: object): Promise<BlogPost[]> {
    return await this.cdaClient.getEntries(Object.assign({
      content_type: CONFIG.contentTypeIds.blogPost
    }, query))
      .then(res => res.items.map((item, index) => {
        let post: BlogPost = {
          blogContent: item.fields['blogContent'] as any,
          blogImage: item.fields['blogImage'] as unknown as ImageData,
          blogSummary: item.fields['blogSummary'] as unknown as String,
          title: item.fields['title'] as unknown as String
        };

        return post;
      }));
  }

  //#region  helpers
  convertToWorkExperience(item: any): WorkExperience {
    return {
      category: item.fields.category as unknown as String,
      description: item.fields.description as unknown as String,
      employer: item.fields.employer as unknown as String,
      jobProjectTitle: item.fields.jobProjectTitle as unknown as String,
      period: item.fields.period as unknown as String,
      fromDate: new Date(item.fields.fromDate),
      toDate: new Date(item.fields.toDate ?? new Date().toLocaleDateString())
    };
  }
  convertToSkillListing(item: any): SkillListing {
    return {
      skillLevelPercentage: item.fields.skillLevelPercentage as unknown as Number,
      name: item.fields.name as unknown as String
    };
  }
  //#endregion
}


