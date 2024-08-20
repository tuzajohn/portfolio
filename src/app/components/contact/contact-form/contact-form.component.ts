import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageResponseHelper } from '../../../interfaces/helpers/messageResponseHelper';
import { ContactForm } from '../../../interfaces/contactInterfaces/contactForm';
import { MessageResponse } from '../../../interfaces/general/messageResponse';


@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  contactForm: ContactForm = new ContactForm();
  messageResponse?: MessageResponse;

  constructor() {

  }

  onSubmit() {
    if (!this.contactForm.isValide.isSuccess) {
      this.messageResponse = new MessageResponseHelper(this.contactForm.isValide.message);
    } else {
      this.messageResponse = new MessageResponseHelper('Message submitted successfully', true);
    }

  }
}
