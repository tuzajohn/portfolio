import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { MessageResponse } from '../../../../shared/interfaces/email';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit {
  form: ContactFormData = { name: '', email: '', subject: '', message: '' };
  messageResponse?: MessageResponse;
  buttonMessage = 'Send Message';
  formLabels: Record<string, string> = {};

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getContactPage().subscribe(page => {
      for (const label of page.formLabels) {
        this.formLabels[label.title] = label.placeholder;
      }
    });
  }

  getLabel(key: string): string {
    return this.formLabels[key] ?? key;
  }

  onSubmit(): void {
    if (!this.form.name || !this.form.email || !this.form.subject || !this.form.message) {
      this.messageResponse = { message: 'All fields are required.', isSuccess: false };
      return;
    }

    this.buttonMessage = 'Sending...';

    this.api.sendEmail({
      from: this.form.email,
      name: this.form.name,
      subject: this.form.subject,
      message: this.form.message
    }).subscribe({
      next: () => {
        this.messageResponse = { message: 'Message sent successfully!', isSuccess: true };
        this.form = { name: '', email: '', subject: '', message: '' };
        this.buttonMessage = 'Send Message';
      },
      error: () => {
        this.messageResponse = { message: 'Failed to send. Please try again later.', isSuccess: false };
        this.buttonMessage = 'Send Message';
      }
    });
  }
}
