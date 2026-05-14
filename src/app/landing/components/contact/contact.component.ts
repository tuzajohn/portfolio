import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactPage } from '../../../shared/interfaces/contact-page';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactFormComponent, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactPage?: ContactPage;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getContactPage().subscribe(data => this.contactPage = data);
  }
}
