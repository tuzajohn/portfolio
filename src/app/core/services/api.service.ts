import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileData } from '../../shared/interfaces/profile';
import { WorkExperience } from '../../shared/interfaces/work-experience';
import { SkillListing } from '../../shared/interfaces/skill';
import { ContactPage } from '../../shared/interfaces/contact-page';
import { PortfolioItem } from '../../shared/interfaces/portfolio-item';
import { BlogPost } from '../../shared/interfaces/blog-post';
import { EmailRequest } from '../../shared/interfaces/email';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = '/api';

  constructor(private http: HttpClient) {}

  // Profile
  getProfile(): Observable<ProfileData> {
    return this.http.get<ProfileData>(`${this.base}/profile`);
  }
  updateProfile(data: Partial<ProfileData>): Observable<ProfileData> {
    return this.http.put<ProfileData>(`${this.base}/profile`, data);
  }

  // Experiences
  getExperiences(): Observable<WorkExperience[]> {
    return this.http.get<WorkExperience[]>(`${this.base}/experiences`);
  }
  createExperience(data: Partial<WorkExperience>): Observable<WorkExperience> {
    return this.http.post<WorkExperience>(`${this.base}/experiences`, data);
  }
  updateExperience(id: string, data: Partial<WorkExperience>): Observable<WorkExperience> {
    return this.http.put<WorkExperience>(`${this.base}/experiences/${id}`, data);
  }
  deleteExperience(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/experiences/${id}`);
  }

  // Skills
  getSkills(): Observable<SkillListing[]> {
    return this.http.get<SkillListing[]>(`${this.base}/skills`);
  }
  createSkill(data: Partial<SkillListing>): Observable<SkillListing> {
    return this.http.post<SkillListing>(`${this.base}/skills`, data);
  }
  updateSkill(id: string, data: Partial<SkillListing>): Observable<SkillListing> {
    return this.http.put<SkillListing>(`${this.base}/skills/${id}`, data);
  }
  deleteSkill(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/skills/${id}`);
  }

  // Portfolio
  getPortfolioItems(): Observable<PortfolioItem[]> {
    return this.http.get<PortfolioItem[]>(`${this.base}/portfolio`);
  }
  createPortfolioItem(data: Partial<PortfolioItem>): Observable<PortfolioItem> {
    return this.http.post<PortfolioItem>(`${this.base}/portfolio`, data);
  }
  updatePortfolioItem(id: string, data: Partial<PortfolioItem>): Observable<PortfolioItem> {
    return this.http.put<PortfolioItem>(`${this.base}/portfolio/${id}`, data);
  }
  deletePortfolioItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/portfolio/${id}`);
  }

  // Blog
  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.base}/blog`);
  }
  createBlogPost(data: Partial<BlogPost>): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.base}/blog`, data);
  }
  updateBlogPost(id: string, data: Partial<BlogPost>): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.base}/blog/${id}`, data);
  }
  deleteBlogPost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/blog/${id}`);
  }

  // Contact page content
  getContactPage(): Observable<ContactPage> {
    return this.http.get<ContactPage>(`${this.base}/contact`);
  }
  updateContactPage(data: Partial<ContactPage>): Observable<ContactPage> {
    return this.http.put<ContactPage>(`${this.base}/contact`, data);
  }
  sendEmail(request: EmailRequest): Observable<void> {
    return this.http.post<void>(`${this.base}/contact/send`, request);
  }
}
