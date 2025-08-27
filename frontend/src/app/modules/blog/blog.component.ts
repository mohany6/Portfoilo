import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService, Blog } from '../../core/services/api.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ButtonComponent,
    CardComponent,
    SectionTitleComponent
  ],
  template: `
    <div class="blog">
      <div class="container">
        <!-- Blog Header -->
        <section class="blog-header">
          <app-section-title
            title="Blog"
            subtitle="Insights, tutorials, and thoughts on web development and technology."
          ></app-section-title>
        </section>

        <!-- Featured Posts -->
        <section *ngIf="featuredPosts.length > 0" class="featured-posts">
          <h2 class="section-subtitle">Featured Posts</h2>
          <div class="featured-posts__grid">
            <app-card 
              *ngFor="let post of featuredPosts"
              [title]="post.title"
              [subtitle]="formatDate(post.createdAt) + ' • ' + post.readTime + ' min read'"
              [image]="post.featuredImage"
              [imageAlt]="post.title"
              variant="elevated"
              [hover]="true"
              [showFooter]="true"
              class="blog-card blog-card--featured"
            >
              <p class="blog-card__excerpt">{{ post.excerpt }}</p>
              
              <div slot="footer" class="blog-card__footer">
                <div class="blog-card__meta">
                  <span class="blog-card__category">{{ post.category }}</span>
                  <div class="blog-card__tags">
                    <span 
                      *ngFor="let tag of post.tags.slice(0, 3)" 
                      class="blog-card__tag"
                    >
                      #{{ tag }}
                    </span>
                  </div>
                </div>
                <div class="blog-card__actions">
                  <app-button 
                    variant="primary" 
                    size="sm"
                    (clicked)="readPost(post)"
                  >
                    Read More
                  </app-button>
                </div>
              </div>
            </app-card>
          </div>
        </section>

        <!-- All Posts -->
        <section class="all-posts">
          <div class="all-posts__header">
            <h2 class="section-subtitle">All Posts</h2>
            
            <!-- Category Filter -->
            <div class="category-filter">
              <button 
                *ngFor="let category of categories" 
                class="category-filter__item"
                [class.category-filter__item--active]="activeCategory === category"
                (click)="filterByCategory(category)"
              >
                {{ category }}
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div *ngIf="isLoading" class="loading">
            <div class="loading__spinner"></div>
            <p>Loading blog posts...</p>
          </div>

          <!-- Blog Posts Grid -->
          <div *ngIf="!isLoading" class="blog-posts">
            <div *ngIf="filteredPosts.length === 0" class="no-posts">
              <p>No blog posts found{{ activeCategory !== 'All' ? ' in ' + activeCategory + ' category' : '' }}.</p>
            </div>

            <div *ngIf="filteredPosts.length > 0" class="blog-posts__grid">
              <app-card 
                *ngFor="let post of filteredPosts"
                [title]="post.title"
                [subtitle]="formatDate(post.createdAt) + ' • ' + post.readTime + ' min read'"
                [image]="post.featuredImage || '/assets/images/blog-default.jpg'"
                [imageAlt]="post.title"
                variant="outlined"
                [hover]="true"
                [showFooter]="true"
                class="blog-card"
              >
                <p class="blog-card__excerpt">{{ post.excerpt }}</p>
                
                <div slot="footer" class="blog-card__footer">
                  <div class="blog-card__meta">
                    <span class="blog-card__category">{{ post.category }}</span>
                    <div class="blog-card__stats">
                      <span class="blog-card__views">
                        <i class="fas fa-eye"></i>
                        {{ post.views }}
                      </span>
                    </div>
                  </div>
                  <div class="blog-card__actions">
                    <app-button 
                      variant="outline" 
                      size="sm"
                      (clicked)="readPost(post)"
                    >
                      Read More
                    </app-button>
                  </div>
                </div>
              </app-card>
            </div>
          </div>
        </section>

        <!-- Newsletter Signup -->
        <section class="newsletter">
          <div class="newsletter__content">
            <h3 class="newsletter__title">Stay Updated</h3>
            <p class="newsletter__description">
              Get the latest posts delivered right to your inbox. No spam, unsubscribe at any time.
            </p>
            <div class="newsletter__form">
              <input 
                type="email" 
                placeholder="Enter your email"
                class="newsletter__input"
                [(ngModel)]="newsletterEmail"
                #emailInput
              />
              <app-button 
                variant="primary"
                size="md"
                (clicked)="subscribeNewsletter()"
                [disabled]="!newsletterEmail"
              >
                Subscribe
              </app-button>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  allPosts: Blog[] = [];
  featuredPosts: Blog[] = [];
  filteredPosts: Blog[] = [];
  isLoading = false;
  newsletterEmail = '';
  
  activeCategory = 'All';
  categories = ['All', 'Web Development', 'Frontend', 'Backend', 'Database', 'DevOps'];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadBlogPosts();
  }

  loadBlogPosts(): void {
    this.isLoading = true;
    
    // Load all posts
    this.apiService.getBlogs().subscribe({
      next: (response) => {
        if (response.success) {
          this.allPosts = response.data;
          this.featuredPosts = this.allPosts.filter(post => post.featured);
          this.filteredPosts = this.allPosts.filter(post => !post.featured);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading blog posts:', error);
        this.isLoading = false;
        // Use fallback data
        this.setFallbackPosts();
      }
    });
  }

  setFallbackPosts(): void {
    const fallbackPosts: Blog[] = [
      {
        title: "Building Scalable Web Applications with Node.js",
        excerpt: "Learn the best practices for creating scalable backend applications using Node.js and Express. We'll cover architecture patterns, performance optimization, and deployment strategies.",
        content: "Full article content here...",
        slug: "building-scalable-web-applications-nodejs",
        author: "Mohamed Hany",
        category: "Backend",
        tags: ["nodejs", "express", "javascript", "backend", "scalability"],
        published: true,
        featured: true,
        readTime: 8,
        views: 1250,
        featuredImage: "/assets/blog/nodejs-scalability.jpg",
        createdAt: new Date('2024-01-15')
      },
      {
        title: "Modern Angular Development Techniques",
        excerpt: "Discover the latest Angular features and best practices for building modern web applications. From standalone components to signals and beyond.",
        content: "Full article content here...",
        slug: "modern-angular-development-techniques",
        author: "Mohamed Hany",
        category: "Frontend",
        tags: ["angular", "typescript", "frontend", "components"],
        published: true,
        featured: true,
        readTime: 6,
        views: 980,
        featuredImage: "/assets/blog/angular-modern.jpg",
        createdAt: new Date('2024-01-10')
      },
      {
        title: "Database Design Best Practices for MongoDB",
        excerpt: "Essential guidelines for designing efficient and scalable MongoDB databases. Learn about schema design, indexing strategies, and performance optimization.",
        content: "Full article content here...",
        slug: "mongodb-database-design-best-practices",
        author: "Mohamed Hany",
        category: "Database",
        tags: ["mongodb", "database", "nosql", "design"],
        published: true,
        featured: false,
        readTime: 10,
        views: 745,
        featuredImage: "/assets/blog/mongodb-design.jpg",
        createdAt: new Date('2024-01-05')
      },
      {
        title: "Implementing JWT Authentication in Express.js",
        excerpt: "A comprehensive guide to implementing secure authentication using JSON Web Tokens in Express.js applications with best security practices.",
        content: "Full article content here...",
        slug: "jwt-authentication-express-guide",
        author: "Mohamed Hany",
        category: "Backend",
        tags: ["jwt", "authentication", "security", "expressjs"],
        published: true,
        featured: false,
        readTime: 12,
        views: 1100,
        createdAt: new Date('2023-12-28')
      }
    ];

    this.allPosts = fallbackPosts;
    this.featuredPosts = fallbackPosts.filter(post => post.featured);
    this.filteredPosts = fallbackPosts.filter(post => !post.featured);
  }

  filterByCategory(category: string): void {
    this.activeCategory = category;
    
    if (category === 'All') {
      this.filteredPosts = this.allPosts.filter(post => !post.featured);
    } else {
      this.filteredPosts = this.allPosts.filter(post => 
        !post.featured && post.category === category
      );
    }
  }

  formatDate(date?: Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  readPost(post: Blog): void {
    // In a real application, navigate to the blog post detail page
    console.log('Reading post:', post.title);
    // this.router.navigate(['/blog', post.slug]);
  }

  subscribeNewsletter(): void {
    if (!this.newsletterEmail) return;
    
    // In a real application, this would call an API to subscribe
    console.log('Subscribing email:', this.newsletterEmail);
    alert('Thank you for subscribing! (This is a demo)');
    this.newsletterEmail = '';
  }
}
