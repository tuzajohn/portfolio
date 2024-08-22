import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageResponseHelper } from '../../../interfaces/helpers/messageResponseHelper';
import { ContactForm } from '../../../interfaces/contactInterfaces/contactForm';
import { MessageResponse } from '../../../interfaces/general/messageResponse';
import { ContentFulCme } from '../../../http/cms/contentful';
import { ContentfullService } from '../../../services/contentfull/contentfull.service';
import { FormFields } from '../../../interfaces/contentful/formFields';


@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {

  contentClient: ContentFulCme = new ContentFulCme();
  contactForm: ContactForm = new ContactForm();
  formLabels!: FormFields[];
  messageResponse?: MessageResponse;

  constructor(private contentfullService: ContentfullService) {

  }

  async ngOnInit(): Promise<void> {
    var field = await this.contentfullService.getFields()
      .then(field => field);

    this.formLabels = field.formLabels;
  }

  extractFieldLabels(key: String): String | undefined {
    let field = this.formLabels.find(f => f.title == key);

    return field?.placeholder;
  }

  onSubmit() {

    if (!this.contactForm.isValide.isSuccess) {
      this.messageResponse = new MessageResponseHelper(this.contactForm.isValide.message);
    } else {
      this.messageResponse = new MessageResponseHelper('Message submitted successfully', true);
    }

  }
}
