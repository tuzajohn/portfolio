import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { PortfolioItem } from '../../../shared/interfaces/portfolio-item';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {
  items: PortfolioItem[] = [];
  selected?: PortfolioItem;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getPortfolioItems().subscribe(items =>
      this.items = items.filter(i => i.isVisible).sort((a, b) => a.order - b.order)
    );
  }

  open(item: PortfolioItem): void { this.selected = item; }
  close(): void { this.selected = undefined; }
}
