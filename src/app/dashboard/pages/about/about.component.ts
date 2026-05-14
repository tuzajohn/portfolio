import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { WorkExperience } from '../../../shared/interfaces/work-experience';
import { SkillListing } from '../../../shared/interfaces/skill';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutPageComponent implements OnInit {
  experiences: WorkExperience[] = [];
  skills: SkillListing[] = [];

  expForm!: FormGroup;
  skillForm!: FormGroup;
  editingExp?: WorkExperience;
  editingSkill?: SkillListing;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.resetExpForm();
    this.resetSkillForm();
    this.loadData();
  }

  loadData(): void {
    this.api.getExperiences().subscribe(e => this.experiences = e);
    this.api.getSkills().subscribe(s => this.skills = s);
  }

  resetExpForm(): void {
    this.expForm = this.fb.group({
      category: ['work', Validators.required],
      jobProjectTitle: ['', Validators.required],
      employer: [''],
      description: [''],
      fromDate: ['', Validators.required],
      toDate: [''],
      period: [''],
      isCurrentRole: [false]
    });
    this.editingExp = undefined;
  }

  editExp(exp: WorkExperience): void {
    this.editingExp = exp;
    this.expForm.patchValue(exp);
  }

  saveExp(): void {
    if (this.expForm.invalid) return;
    const data = this.expForm.value;
    const obs = this.editingExp?._id
      ? this.api.updateExperience(this.editingExp._id, data)
      : this.api.createExperience(data);
    obs.subscribe(() => { this.resetExpForm(); this.loadData(); });
  }

  deleteExp(id: string): void {
    if (!confirm('Delete this experience?')) return;
    this.api.deleteExperience(id).subscribe(() => this.loadData());
  }

  resetSkillForm(): void {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      skillLevelPercentage: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
      order: [0]
    });
    this.editingSkill = undefined;
  }

  editSkill(skill: SkillListing): void {
    this.editingSkill = skill;
    this.skillForm.patchValue(skill);
  }

  saveSkill(): void {
    if (this.skillForm.invalid) return;
    const data = this.skillForm.value;
    const obs = this.editingSkill?._id
      ? this.api.updateSkill(this.editingSkill._id, data)
      : this.api.createSkill(data);
    obs.subscribe(() => { this.resetSkillForm(); this.loadData(); });
  }

  deleteSkill(id: string): void {
    if (!confirm('Delete this skill?')) return;
    this.api.deleteSkill(id).subscribe(() => this.loadData());
  }
}
