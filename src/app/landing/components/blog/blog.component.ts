import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { BlogPost } from '../../../shared/interfaces/blog-post';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  posts: BlogPost[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getBlogPosts().subscribe(posts =>
      this.posts = posts.filter(p => p.isPublished)
    );
  }
}
