import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfilePageComponent implements OnInit {
  form!: FormGroup;
  saving = false;
  saved = false;
  error = '';

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      latestWorkPosition: [''],
      shortResume: [''],
      imageUrl: [''],
      address: [''],
      primaryPhoneNumber: [''],
      skype: [''],
      languages: [''],
      nationality: [''],
      dateOfBirth: [''],
      cvUrl: ['']
    });

    this.api.getProfile().subscribe(data => this.form.patchValue(data));
  }

  onSave(): void {
    if (this.form.invalid) return;
    this.saving = true;
    this.saved = false;
    this.error = '';

    this.api.updateProfile(this.form.value).subscribe({
      next: () => { this.saving = false; this.saved = true; },
      error: () => { this.saving = false; this.error = 'Failed to save. Please try again.'; }
    });
  }
}
