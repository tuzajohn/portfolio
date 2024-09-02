import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentfullService } from '../../services/contentfull/contentfull.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

  constructor(private contentfullService: ContentfullService) {

  }

  async ngOnInit(): Promise<void> {

    await this.contentfullService.getPosts();

  }

}
