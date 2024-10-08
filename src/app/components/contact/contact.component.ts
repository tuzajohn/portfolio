import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { FieldsRoot } from '../../interfaces/contentful/rootFields';
import { ContentfullService } from '../../services/contentfull/contentfull.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactFormComponent, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  fieldRoot!: FieldsRoot;

  title: String = "hello";

  constructor(private contentfullService: ContentfullService) {

  }

  async ngOnInit(): Promise<void> {

    var field = await this.contentfullService.getFields()
      .then(field => field);

    this.fieldRoot = field;
  }
}
