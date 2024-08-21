import { ContactDetails } from "./contactDetails";
import { FormFields } from "./formFields";
import { SocialHandle } from "./socialHandles";

export interface FieldsRoot {
    pageHeaderBackground: String,
    pageHeaderForeground: String,
    descriptionIntro: String,
    descriptionLongContent: String,
    contactDetails: ContactDetails[],
    formLabels: FormFields[],
    socials: SocialHandle[]
}
