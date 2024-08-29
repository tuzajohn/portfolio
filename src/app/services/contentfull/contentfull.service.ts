import { Injectable } from '@angular/core';
import { Asset, createClient, Entry } from 'contentful';
import { FieldsRoot } from '../../interfaces/contentful/rootFields';
import { EntryRoot } from '../../interfaces/contentful/entryRoot';
import { ContactDetails } from '../../interfaces/contentful/contactDetails';
import { FormFields } from '../../interfaces/contentful/formFields';
import { SocialHandle } from '../../interfaces/contentful/socialHandles';
import { ProfileData } from '../../interfaces/contactInterfaces/profileData';
import { ProfileImage } from '../../interfaces/contactInterfaces/profileImage';

const CONFIG = {
  space: '9w8s7scmuhwg',
  accessToken: 'iUZsO2KAWRsG_ChwxFDxPIrrhVFDiCbK8qnYVd99I8o',

  contentTypeIds: {
    contactContent: '2SlDeT1TCCOn80K8FZ04TD',
    profileData: '5bBRto8vxOO1QVgEDjStS'
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

  constructor() { }

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

  async getAsset(assetId: string): Promise<String> {
    return await this.cdaClient.getAsset(assetId)
      .then(img => {
        console.log({ img });
        let url: String = img['fields']?.['file']?.['url'] as unknown as String;
        return url;
      });;
  }
}
