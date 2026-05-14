import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { BlogPost } from '../../../shared/interfaces/blog-post';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogPageComponent implements OnInit {
  posts: BlogPost[] = [];
  form!: FormGroup;
  editing?: BlogPost;
  showForm = false;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.resetForm();
    this.load();
  }

  load(): void {
    this.api.getBlogPosts().subscribe(posts => this.posts = posts);
  }

  resetForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      excerpt: [''],
      content: ['', Validators.required],
      thumbnailUrl: [''],
      publishedAt: [new Date().toISOString().substring(0, 10)],
      tags: [''],
      isPublished: [false]
    });
    this.editing = undefined;
    this.showForm = false;
  }

  openAdd(): void { this.resetForm(); this.showForm = true; }

  editPost(post: BlogPost): void {
    this.editing = post;
    this.showForm = true;
    this.form.patchValue({
      ...post,
      tags: post.tags.join(', '),
      publishedAt: post.publishedAt.substring(0, 10)
    });
  }

  save(): void {
    if (this.form.invalid) return;
    const raw = this.form.value;
    const data: Partial<BlogPost> = {
      ...raw,
      tags: raw.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
    };
    const obs = this.editing?._id
      ? this.api.updateBlogPost(this.editing._id, data)
      : this.api.createBlogPost(data);
    obs.subscribe(() => { this.resetForm(); this.load(); });
  }

  delete(id: string): void {
    if (!confirm('Delete this post?')) return;
    this.api.deleteBlogPost(id).subscribe(() => this.load());
  }
}
