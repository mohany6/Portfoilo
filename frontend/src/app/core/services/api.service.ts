import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Screenshot {
  url: string;
  caption: string;
  type: 'image' | 'gif';
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  screenshots?: Screenshot[];
  featured: boolean;
  order: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Blog {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  category: string;
  featuredImage?: string;
  published: boolean;
  featured: boolean;
  readTime: number;
  views: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl || 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Project methods
  getProjects(featured?: boolean, status: string = 'active'): Observable<ApiResponse<Project[]>> {
    let params = new HttpParams().set('status', status);
    if (featured !== undefined) {
      params = params.set('featured', featured.toString());
    }
    return this.http.get<ApiResponse<Project[]>>(`${this.baseUrl}/portfolio/projects`, { params });
  }

  getProjectById(id: string): Observable<ApiResponse<Project>> {
    return this.http.get<ApiResponse<Project>>(`${this.baseUrl}/portfolio/projects/${id}`);
  }

  createProject(project: Partial<Project>): Observable<ApiResponse<Project>> {
    return this.http.post<ApiResponse<Project>>(`${this.baseUrl}/portfolio/projects`, project);
  }

  updateProject(id: string, project: Partial<Project>): Observable<ApiResponse<Project>> {
    return this.http.put<ApiResponse<Project>>(`${this.baseUrl}/portfolio/projects/${id}`, project);
  }

  deleteProject(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/portfolio/projects/${id}`);
  }

  // Blog methods
  getBlogs(published: boolean = true, featured?: boolean, category?: string, tag?: string): Observable<ApiResponse<Blog[]>> {
    let params = new HttpParams().set('published', published.toString());
    if (featured !== undefined) {
      params = params.set('featured', featured.toString());
    }
    if (category) {
      params = params.set('category', category);
    }
    if (tag) {
      params = params.set('tag', tag);
    }
    return this.http.get<ApiResponse<Blog[]>>(`${this.baseUrl}/portfolio/blogs`, { params });
  }

  getBlogById(id: string): Observable<ApiResponse<Blog>> {
    return this.http.get<ApiResponse<Blog>>(`${this.baseUrl}/portfolio/blogs/${id}`);
  }

  getBlogBySlug(slug: string): Observable<ApiResponse<Blog>> {
    return this.http.get<ApiResponse<Blog>>(`${this.baseUrl}/portfolio/blog/slug/${slug}`);
  }

  createBlog(blog: Partial<Blog>): Observable<ApiResponse<Blog>> {
    return this.http.post<ApiResponse<Blog>>(`${this.baseUrl}/portfolio/blogs`, blog);
  }

  // Contact method
  submitContactForm(contactData: ContactForm): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/portfolio/contact`, contactData);
  }

  // Health check
  checkApiHealth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/health`);
  }
}
