import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactPageComponent implements OnInit {
  form!: FormGroup;
  saving = false;
  saved = false;
  error = '';

  constructor(private fb: FormBuilder, private api: ApiService) {}

  get contactDetails(): FormArray { return this.form.get('contactDetails') as FormArray; }
  get socials(): FormArray { return this.form.get('socials') as FormArray; }
  get formLabels(): FormArray { return this.form.get('formLabels') as FormArray; }

  ngOnInit(): void {
    this.form = this.fb.group({
      pageHeaderForeground: [''],
      pageHeaderBackground: [''],
      descriptionIntro: [''],
      descriptionLongContent: [''],
      contactDetails: this.fb.array([]),
      socials: this.fb.array([]),
      formLabels: this.fb.array([])
    });

    this.api.getContactPage().subscribe(data => {
      this.form.patchValue({
        pageHeaderForeground: data.pageHeaderForeground,
        pageHeaderBackground: data.pageHeaderBackground,
        descriptionIntro: data.descriptionIntro,
        descriptionLongContent: data.descriptionLongContent
      });
      data.contactDetails.forEach(d => this.contactDetails.push(this.fb.group(d)));
      data.socials.forEach(s => this.socials.push(this.fb.group(s)));
      data.formLabels.forEach(f => this.formLabels.push(this.fb.group(f)));
    });
  }

  addDetail(): void {
    this.contactDetails.push(this.fb.group({ title: '', text: '', iconRef: '', isActive: true }));
  }
  removeDetail(i: number): void { this.contactDetails.removeAt(i); }

  addSocial(): void {
    this.socials.push(this.fb.group({ url: '', title: '', iconRef: '', isActive: true }));
  }
  removeSocial(i: number): void { this.socials.removeAt(i); }

  addLabel(): void {
    this.formLabels.push(this.fb.group({ title: '', placeholder: '' }));
  }
  removeLabel(i: number): void { this.formLabels.removeAt(i); }

  onSave(): void {
    this.saving = true;
    this.saved = false;
    this.error = '';
    this.api.updateContactPage(this.form.value).subscribe({
      next: () => { this.saving = false; this.saved = true; },
      error: () => { this.saving = false; this.error = 'Failed to save.'; }
    });
  }
}
