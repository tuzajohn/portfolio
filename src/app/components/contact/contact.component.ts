import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { FieldsRoot } from '../../interfaces/contentful/rootFields';
import { ContentFulCme } from '../../http/cms/contentful';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contentClient: ContentFulCme = new ContentFulCme();
  fieldRoot!: FieldsRoot;

  ngOnInit(): void {

    this.fieldRoot = this.contentClient.getContactPageDetails();

  }
}
