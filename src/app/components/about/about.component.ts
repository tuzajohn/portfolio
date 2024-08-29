import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentfullService } from '../../services/contentfull/contentfull.service';
import { WorkExperience } from '../../interfaces/contentful/work-experience';
import { SkillListing } from '../../interfaces/contentful/skill-listing';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  experiences: WorkExperience[][] = [];
  skillListings: SkillListing[] = [];

  constructor(private contentFullService: ContentfullService) { }

  async ngOnInit(): Promise<void> {
    let wExp = await this.contentFullService.getExperiences();

    wExp.sort((a, b) => b.fromDate.getFullYear() - a.fromDate.getFullYear());

    let separatorCount = Math.ceil(wExp.length / 2);
    this.experiences = wExp
      .map((_, index, array) => (index % separatorCount === 0 ? array.slice(index, index + separatorCount) : null))
      .filter(group => group !== null) as WorkExperience[][];


    let skills = await this.contentFullService.getSkills();
    this.skillListings = skills;
  }

  async getWorkExperience(): Promise<void> {

  }

  async getSkillListing(): Promise<void> {

  }
}
