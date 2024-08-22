import * as contentfulClient from 'contentful'
import { FieldsRoot } from '../../interfaces/contentful/rootFields';
import { EntryRoot } from '../../interfaces/contentful/entryRoot';

export class ContentFulCme {
    private client: any;
    constructor() {
        this.client = contentfulClient.createClient({
            space: '9w8s7scmuhwg',
            accessToken: 'iUZsO2KAWRsG_ChwxFDxPIrrhVFDiCbK8qnYVd99I8o'
        });
    }

    getContactPageDetails(): FieldsRoot {
        let contactPageContent: FieldsRoot = this.client
            .getEntry('2SlDeT1TCCOn80K8FZ04TD')
            .then((entry: EntryRoot) => {
                return entry.fields;
            })
            .catch((err: Error) => {
                console.log(err)
            });

        return contactPageContent;
    }
}