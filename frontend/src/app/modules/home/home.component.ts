import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService, Project, Screenshot } from '../../core/services/api.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    CardComponent,
    SectionTitleComponent
  ],
  template: `
    <div class="home">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero__container">
          <div class="hero__content">
            <div class="hero__text">
              <h1 class="hero__title">
                <span class="hero__name">Mohamed Hany</span>
                <span class="hero__role">Full-Stack Developer</span>
              </h1>
              <p class="hero__subtitle">Angular, Node.js, MongoDB</p>
              <p class="hero__description">
                Building scalable web apps with modern technologies
              </p>
              <div class="hero__actions">
                <app-button 
                  variant="primary" 
                  size="lg" 
                  (clicked)="scrollToProjects()"
                >
                  View My Work
                </app-button>
                <div class="hero__social">
                  <a href="https://github.com/mohany6" target="_blank" class="hero__social-link">
                    <i class="fab fa-github"></i>
                    <span>Github</span>
                  </a>
                  <a href="https://drive.google.com/file/d/1lXn_JH5fECEyr0c2duNMAlfSBTZlRDii/view?usp=sharing" target="_blank" class="hero__social-link">
                    <i class="fas fa-file-pdf"></i>
                    <span>CV/Resume</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="hero__image">
              <div class="hero__image-container">
                <img src="/assets/images/profile.jpg" alt="mohany" class="hero__avatar" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- About Me Section -->
      <section class="about-preview">
        <div class="container">
          <app-section-title
            title="About Me"
            subtitle="I am a full-stack developer specializing in Angular, Node.js, and MongoDB. I help businesses transform ideas into high-performing applications."
          ></app-section-title>
          
          <!-- Tech Stack -->
          <div class="tech-stack">
            <h3 class="tech-stack__title">Tech Stack</h3>
            <div class="tech-stack__grid">
              <div *ngFor="let tech of techStack" class="tech-stack__item">
                <div class="tech-stack__icon">
                  <img [src]="tech.icon" [alt]="tech.name" />
                </div>
                <span class="tech-stack__name">{{ tech.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section class="projects-preview" id="projects">
        <div class="floating-element"></div>
        <div class="container">
          <app-section-title
            title="Projects"
            subtitle="Here are some of my featured projects showcasing different technologies and approaches."
          ></app-section-title>

          <div class="projects-grid" *ngIf="featuredProjects.length > 0">
            <app-card 
              *ngFor="let project of featuredProjects"
              [title]="project.title"
              [subtitle]="project.shortDescription"
              [image]="project.image"
              [imageAlt]="project.title"
              variant="elevated"
              [hover]="true"
              [showFooter]="true"
            >
              <div class="project-description">
                <p [class.project-description--expanded]="isExpanded(project.title)">
                  {{ isExpanded(project.title) ? project.description : getTruncatedDescription(project.description) }}
                </p>
                <button 
                  *ngIf="shouldShowReadMore(project.description)"
                  class="read-more-btn"
                  (click)="toggleDescription(project.title)"
                >
                  {{ isExpanded(project.title) ? 'Read Less' : 'Read More' }}
                  <i [class]="isExpanded(project.title) ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
                </button>
              </div>
              
              <div slot="footer" class="project-card__footer">
                <div class="project-card__technologies">
                  <span 
                    *ngFor="let tech of project.technologies" 
                    class="project-card__tech-badge"
                  >
                    {{ tech }}
                  </span>
                </div>
                <div class="project-card__actions">
                  <app-button 
                    *ngIf="project.githubUrl"
                    variant="ghost" 
                    size="sm"
                    (clicked)="openLink(project.githubUrl)"
                  >
                    GitHub
                  </app-button>
                  <app-button 
                    *ngIf="project.screenshots && project.screenshots.length > 0"
                    variant="outline" 
                    size="sm"
                    (clicked)="openScreenshots(project)"
                  >
                    <i class="fas fa-images"></i>
                    View Screenshots
                  </app-button>
                </div>
              </div>
            </app-card>
          </div>

          <div class="projects-preview__actions">
            <app-button 
              routerLink="/projects" 
              variant="primary" 
              size="lg"
            >
              View All Projects
            </app-button>
          </div>
        </div>
      </section>

      <!-- Contact Preview -->
      <section class="contact-preview">
        <div class="container">
          <app-section-title
            title="Contact Me"
            subtitle="Let's work together to bring your ideas to life."
          ></app-section-title>
          
          <div class="contact-preview__actions">
            <app-button 
              routerLink="/contact" 
              variant="primary" 
              size="lg"
            >
              Get In Touch
            </app-button>
          </div>
        </div>
      </section>
    </div>

    <!-- Screenshot Modal -->
    <div *ngIf="isModalOpen" class="screenshot-modal" (click)="closeModal($event)">
      <div class="screenshot-modal__overlay"></div>
      <div class="screenshot-modal__content">
        <div class="screenshot-modal__header">
          <h3 class="screenshot-modal__title">{{ modalProjectTitle }}</h3>
          <button class="screenshot-modal__close" (click)="closeModal($event)">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="screenshot-modal__viewer">
          <button 
            *ngIf="modalScreenshots.length > 1"
            class="screenshot-modal__nav screenshot-modal__nav--prev" 
            (click)="previousScreenshot($event)"
            [disabled]="currentScreenshotIndex === 0"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          
          <div class="screenshot-modal__image-container">
            <img 
              *ngIf="modalScreenshots[currentScreenshotIndex].type === 'image'"
              [src]="modalScreenshots[currentScreenshotIndex].url" 
              [alt]="modalScreenshots[currentScreenshotIndex].caption"
              class="screenshot-modal__image"
              (load)="onImageLoad($event)"
            />
            <img 
              *ngIf="modalScreenshots[currentScreenshotIndex].type === 'gif'"
              [src]="modalScreenshots[currentScreenshotIndex].url" 
              [alt]="modalScreenshots[currentScreenshotIndex].caption"
              class="screenshot-modal__gif"
            />
            <div class="screenshot-modal__caption">
              {{ modalScreenshots[currentScreenshotIndex].caption }}
            </div>
          </div>
          
          <button 
            *ngIf="modalScreenshots.length > 1"
            class="screenshot-modal__nav screenshot-modal__nav--next" 
            (click)="nextScreenshot($event)"
            [disabled]="currentScreenshotIndex === modalScreenshots.length - 1"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <div *ngIf="modalScreenshots.length > 1" class="screenshot-modal__indicators">
          <span 
            *ngFor="let screenshot of modalScreenshots; let i = index" 
            class="screenshot-modal__indicator"
            [class.screenshot-modal__indicator--active]="i === currentScreenshotIndex"
            (click)="goToScreenshot(i, $event)"
          ></span>
        </div>
        
        <div class="screenshot-modal__counter" *ngIf="modalScreenshots.length > 1">
          {{ currentScreenshotIndex + 1 }} / {{ modalScreenshots.length }}
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredProjects: Project[] = [];
  isLoading = false;
  
  // Screenshot modal properties
  isModalOpen = false;
  modalScreenshots: Screenshot[] = [];
  currentScreenshotIndex = 0;
  modalProjectTitle = '';
  
  // Read more functionality
  expandedProjects: Set<string> = new Set();

  techStack = [
    { name: 'Angular', icon: '/assets/icons/angular.svg' },
    { name: 'React', icon: '/assets/icons/react.svg' },
    { name: 'Vue', icon: '/assets/icons/vue.svg' },
    { name: 'Node.js', icon: '/assets/icons/nodejs.svg' },
    { name: 'Express', icon: '/assets/icons/express.svg' },
    { name: 'PostgreSQL', icon: '/assets/icons/postgresql.svg' }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadFeaturedProjects();
  }

  loadFeaturedProjects(): void {
    this.isLoading = true;
    this.apiService.getProjects(true).subscribe({
      next: (response) => {
        if (response.success) {
          this.featuredProjects = response.data.slice(0, 3); // Show only top 3
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading featured projects:', error);
        this.isLoading = false;
        // Use fallback data
        this.setFallbackProjects();
      }
    });
  }

  setFallbackProjects(): void {
    this.featuredProjects = [
      {
        title: "Cinema Booking System",
        description: "A comprehensive movie ticket booking system with seat selection, payment processing, and admin dashboard.",
        shortDescription: "Booking movie tickets online.",
        image: "/assets/screenshots/cinema-booking/Screenshot 2025-08-27 075106.png",
        technologies: ["Angular", "Node.js", "MongoDB"],
        githubUrl: "https://github.com/mohany6/cinema-booking",
        screenshots: [
          {
            url: "/assets/screenshots/cinema-booking/Screenshot 2025-08-27 075106.png",
            caption: "Cinema homepage with featured movies and showtimes",
            type: "image"
          },
          {
            url: "/assets/screenshots/cinema-booking/Screenshot 2025-08-27 075044.png",
            caption: "Movie selection and booking interface",
            type: "image"
          },
          {
            url: "/assets/screenshots/cinema-booking/Screenshot 2025-08-27 075038.png",
            caption: "Seat selection and booking confirmation",
            type: "image"
          },
          {
            url: "/assets/screenshots/cinema-booking/Screenshot 2025-08-27 075031.png",
            caption: "Payment processing and booking summary",
            type: "image"
          },
          {
            url: "/assets/screenshots/cinema-booking/Screenshot 2025-08-27 075023.png",
            caption: "Admin dashboard for managing movies and bookings",
            type: "image"
          }
        ],
        featured: true,
        order: 1,
        status: "active"
      },


      {
        title: "Healthcare Management with AI-Powered Diagnostics",
        description: "A comprehensive healthcare management platform specializing in pulmonology with AI-powered medical image analysis and multi-role user management. Built a patient management system for appointment booking, medical history tracking, and prescriptions with real-time notifications.",
        shortDescription: "AI-powered healthcare platform for pulmonology with medical image analysis.",
        image: "/assets/projects/healthcare-ai.jpg",
        technologies: ["Angular", "Node.js", "MongoDB", "Python", "FastAPI", "AI/ML"],
        githubUrl: "https://github.com/mohamedhany/healthcare-ai",
        screenshots: [
          {
            url: "/assets/screenshots/healthcare-ai/Home/Home.png",
            caption: "Patient homepage with health dashboard and quick access to services",
            type: "image"
          },
          {
            url: "/assets/screenshots/healthcare-ai/Home/ai.png",
            caption: "AI-powered medical diagnosis and health recommendations",
            type: "image"
          },
          {
            url: "/assets/screenshots/healthcare-ai/booking/booking1.png",
            caption: "Advanced appointment booking system with doctor selection",
            type: "image"
          },
          {
            url: "/assets/screenshots/healthcare-ai/doctor/doctor-home.png",
            caption: "Doctor dashboard with patient appointments and analytics",
            type: "image"
          },
          {
            url: "/assets/screenshots/healthcare-ai/admin/dashboard.png",
            caption: "Administrator dashboard with system overview and metrics",
            type: "image"
          }
        ],
        featured: true,
        order: 4,
        status: "active"
      }
    ];
  }

  scrollToProjects(): void {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openLink(url: string): void {
    window.open(url, '_blank');
  }

  // Screenshot modal methods
  openScreenshots(project: Project): void {
    if (project.screenshots && project.screenshots.length > 0) {
      this.modalProjectTitle = project.title;
      this.modalScreenshots = project.screenshots;
      this.currentScreenshotIndex = 0;
      this.isModalOpen = true;
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  }

  closeModal(event: Event): void {
    event.stopPropagation();
    // Allow closing when clicking overlay or close button
    if (event.target === event.currentTarget || (event.target as HTMLElement).closest('.screenshot-modal__close')) {
      this.isModalOpen = false;
      document.body.style.overflow = 'auto';
      this.modalScreenshots = [];
      this.currentScreenshotIndex = 0;
      this.modalProjectTitle = '';
    }
  }

  previousScreenshot(event: Event): void {
    event.stopPropagation();
    if (this.currentScreenshotIndex > 0) {
      this.currentScreenshotIndex--;
    }
  }

  nextScreenshot(event: Event): void {
    event.stopPropagation();
    if (this.currentScreenshotIndex < this.modalScreenshots.length - 1) {
      this.currentScreenshotIndex++;
    }
  }

  goToScreenshot(index: number, event: Event): void {
    event.stopPropagation();
    this.currentScreenshotIndex = index;
  }

  onImageLoad(event: Event): void {
    // Handle image load if needed
  }

  // Read more functionality
  isExpanded(projectTitle: string): boolean {
    return this.expandedProjects.has(projectTitle);
  }

  shouldShowReadMore(description: string): boolean {
    return description.length > 150; // Show read more if description is longer than 150 characters
  }

  getTruncatedDescription(description: string): string {
    if (description.length <= 150) {
      return description;
    }
    return description.substring(0, 150) + '...';
  }

  toggleDescription(projectTitle: string): void {
    if (this.expandedProjects.has(projectTitle)) {
      this.expandedProjects.delete(projectTitle);
    } else {
      this.expandedProjects.add(projectTitle);
    }
  }
}
