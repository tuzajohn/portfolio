import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { PortfolioItem } from '../../../shared/interfaces/portfolio-item';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioPageComponent implements OnInit {
  items: PortfolioItem[] = [];
  form!: FormGroup;
  editing?: PortfolioItem;
  showForm = false;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.resetForm();
    this.load();
  }

  load(): void {
    this.api.getPortfolioItems().subscribe(items =>
      this.items = items.sort((a, b) => a.order - b.order)
    );
  }

  resetForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      projectType: [''],
      client: [''],
      technologies: [''],
      previewUrl: [''],
      thumbnailUrl: ['', Validators.required],
      contentType: ['image'],
      mediaUrls: [''],
      description: [''],
      order: [0],
      isVisible: [true]
    });
    this.editing = undefined;
    this.showForm = false;
  }

  openAdd(): void { this.resetForm(); this.showForm = true; }

  editItem(item: PortfolioItem): void {
    this.editing = item;
    this.showForm = true;
    this.form.patchValue({
      ...item,
      mediaUrls: item.mediaUrls.join('\n')
    });
  }

  save(): void {
    if (this.form.invalid) return;
    const raw = this.form.value;
    const data: Partial<PortfolioItem> = {
      ...raw,
      mediaUrls: raw.mediaUrls.split('\n').map((u: string) => u.trim()).filter(Boolean)
    };
    const obs = this.editing?._id
      ? this.api.updatePortfolioItem(this.editing._id, data)
      : this.api.createPortfolioItem(data);
    obs.subscribe(() => { this.resetForm(); this.load(); });
  }

  delete(id: string): void {
    if (!confirm('Delete this portfolio item?')) return;
    this.api.deletePortfolioItem(id).subscribe(() => this.load());
  }
}
