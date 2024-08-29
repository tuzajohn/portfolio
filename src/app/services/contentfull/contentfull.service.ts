import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { FieldsRoot } from '../../interfaces/contentful/rootFields';
import { EntryRoot } from '../../interfaces/contentful/entryRoot';
import { ContactDetails } from '../../interfaces/contentful/contactDetails';
import { FormFields } from '../../interfaces/contentful/formFields';
import { SocialHandle } from '../../interfaces/contentful/socialHandles';

const CONFIG = {
  space: '9w8s7scmuhwg',
  accessToken: 'iUZsO2KAWRsG_ChwxFDxPIrrhVFDiCbK8qnYVd99I8o',

  contentTypeIds: {
    contactContent: '2SlDeT1TCCOn80K8FZ04TD',
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

        console.log({ fieldRoot });

        return fieldRoot;
      })

  }

  async getWelcomeData(): Promise<any> {

  }
}
