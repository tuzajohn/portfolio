import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { WorkExperience } from '../../../shared/interfaces/work-experience';
import { SkillListing } from '../../../shared/interfaces/skill';
import { ProfileData } from '../../../shared/interfaces/profile';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  profile?: ProfileData;
  experiences: WorkExperience[][] = [];
  skillListings: SkillListing[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getProfile().subscribe(p => this.profile = p);

    this.api.getExperiences().subscribe(exp => {
      exp.sort((a, b) => new Date(b.fromDate).getFullYear() - new Date(a.fromDate).getFullYear());
      const half = Math.ceil(exp.length / 2);
      this.experiences = [exp.slice(0, half), exp.slice(half)];
    });

    this.api.getSkills().subscribe(skills => this.skillListings = skills);
  }
}
