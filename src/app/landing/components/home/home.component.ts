import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { ProfileData } from '../../../shared/interfaces/profile';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  profile?: ProfileData;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getProfile().subscribe(data => this.profile = data);
  }
}
