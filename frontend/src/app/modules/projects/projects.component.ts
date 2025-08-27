import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService, Project, Screenshot } from '../../core/services/api.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    CardComponent,
    SectionTitleComponent
  ],
  template: `
    <div class="projects">
      <div class="container">
        <!-- Projects Header -->
        <section class="projects-header">
          <app-section-title
            title="My Projects"
            subtitle="A showcase of my work demonstrating various technologies and problem-solving approaches."
          ></app-section-title>
        </section>

        <!-- Filter Tabs -->
        <section class="projects-filter">
          <div class="filter-tabs">
            <button 
              *ngFor="let filter of filters" 
              class="filter-tab"
              [class.filter-tab--active]="activeFilter === filter.key"
              (click)="setFilter(filter.key)"
            >
              {{ filter.label }}
            </button>
          </div>
        </section>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="loading">
          <div class="loading__spinner"></div>
          <p>Loading projects...</p>
        </div>

        <!-- Projects Grid -->
        <section *ngIf="!isLoading" class="projects-grid-section">
          <div *ngIf="filteredProjects.length === 0" class="no-projects">
            <p>No projects found for the selected filter.</p>
          </div>

          <div *ngIf="filteredProjects.length > 0" class="projects-grid">
            <app-card 
              *ngFor="let project of filteredProjects"
              [title]="project.title"
              [subtitle]="project.shortDescription"
              [image]="project.image"
              [imageAlt]="project.title"
              variant="elevated"
              [hover]="true"
              [showFooter]="true"
              class="project-card"
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
                    <i class="fab fa-github"></i>
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
        </section>

        <!-- Call to Action -->
        <section class="projects-cta">
          <div class="projects-cta__content">
            <h3 class="projects-cta__title">Interested in Working Together?</h3>
            <p class="projects-cta__description">
              I'm always open to discussing new projects and opportunities. 
              Let's create something amazing together!
            </p>
            <div class="projects-cta__actions">
              <app-button 
                routerLink="/contact" 
                variant="primary" 
                size="lg"
              >
                Start a Project
              </app-button>
              <app-button 
                variant="outline" 
                size="lg"
                (clicked)="downloadCV()"
              >
                Download CV
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
                *ngIf="modalScreenshots[currentScreenshotIndex]?.type === 'image'"
                [src]="modalScreenshots[currentScreenshotIndex]?.url" 
                [alt]="modalScreenshots[currentScreenshotIndex]?.caption"
                class="screenshot-modal__image"
                (load)="onImageLoad($event)"
              />
              <img 
                *ngIf="modalScreenshots[currentScreenshotIndex]?.type === 'gif'"
                [src]="modalScreenshots[currentScreenshotIndex]?.url" 
                [alt]="modalScreenshots[currentScreenshotIndex]?.caption"
                class="screenshot-modal__gif"
              />
              <div class="screenshot-modal__caption">
                {{ modalScreenshots[currentScreenshotIndex]?.caption }}
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
    </div>
  `,
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  isLoading = false;
  activeFilter = 'all';
  
  // Screenshot modal properties
  isModalOpen = false;
  modalScreenshots: Screenshot[] = [];
  currentScreenshotIndex = 0;
  modalProjectTitle = '';
  
  // Read more functionality
  expandedProjects: Set<string> = new Set();

  filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'angular', label: 'Angular' },
    { key: 'react', label: 'React' },
    { key: 'nodejs', label: 'Node.js' },
    { key: 'fullstack', label: 'Full Stack' }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.apiService.getProjects().subscribe({
      next: (response) => {
        if (response.success) {
          this.projects = response.data;
          this.applyFilter();
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.isLoading = false;
        // Use fallback data
        this.setFallbackProjects();
        this.applyFilter();
      }
    });
  }

  setFallbackProjects(): void {
    this.projects = [
      {
        title: "Cinema Booking System",
        description: "A comprehensive movie ticket booking system with seat selection, payment processing, and admin dashboard. Features include real-time seat availability, multiple payment methods, and booking management with email notifications.",
        shortDescription: "Booking movie tickets online.",
        image: "/assets/projects/cinema-booking.jpg",
        technologies: ["Angular", "Node.js", "MongoDB", "Socket.io", "Stripe"],
        githubUrl: "https://github.com/mohany6/cinema-booking",
        screenshots: [
          {
            url: "/assets/screenshots/cinema-booking/homepage.jpg",
            caption: "Homepage with featured movies and showings",
            type: "image"
          },
          {
            url: "/assets/screenshots/cinema-booking/seat-selection.gif",
            caption: "Interactive seat selection with real-time availability",
            type: "gif"
          },
          {
            url: "/assets/screenshots/cinema-booking/booking-flow.gif",
            caption: "Complete booking workflow from selection to payment",
            type: "gif"
          },
          {
            url: "/assets/screenshots/cinema-booking/dashboard.jpg",
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
        description: "A comprehensive healthcare management platform specializing in pulmonology with AI-powered medical image analysis and multi-role user management. Built a patient management system for appointment booking, medical history tracking, and prescriptions with real-time notifications. Integrated Python FastAPI-based AI service for chest X-ray & CT scan analysis with 95% confidence accuracy. Implemented JWT authentication with role-based access (Patients, Doctors, Admins) and 2FA. Designed a doctor verification workflow including document upload, ID validation, and license verification. Created a dynamic appointment scheduling system with reminders and conflict prevention. Built an analytics-driven admin dashboard for doctor approval workflows and system monitoring. Applied strong security practices including Helmet.js, CORS, validation, and secure file handling. Business Impact: Reduced manual verification time by 70%, streamlined appointment workflows, and improved diagnostic accuracy.",
        shortDescription: "AI-powered healthcare platform for pulmonology with medical image analysis.",
        image: "/assets/projects/healthcare-ai.jpg",
        technologies: ["Angular", "Node.js", "MongoDB", "Python", "FastAPI", "AI/ML"],
        githubUrl: "https://github.com/mohany6/Healthcare-Management",
        screenshots: [
          // Home/Patient Portal
          {
            url: "/assets/screenshots/healthcare-ai/Home/Home.png",
            caption: "Patient homepage with health dashboard and quick access to services",
            type: "image"
          },
          {
            url: "/assets/screenshots/healthcare-ai/Home/find-doctor.png",
            caption: "Advanced doctor search with specialty and location filters",
            type: "image"
          },
          {
            url: "/assets/screenshots/healthcare-ai/Home/ai.png",
            caption: "AI-powered medical diagnosis and health recommendations",
            type: "image"
          },
          {
            url: "/assets/screenshots/healthcare-ai/Home/doctors-card.png",
            caption: "Doctor profiles with ratings, specialties, and availability",
            type: "image"
          },
          
          // Authentication & Security
          {
            url: "/assets/screenshots/healthcare-ai/auth/login.png",
            caption: "Secure login interface with multi-factor authentication",
            type: "image"
          },
          {
            url: "/assets/screenshots/healthcare-ai/secruty/2fa.png",
            caption: "Two-factor authentication setup for enhanced security",
            type: "image"
          },
          {
            url: "/assets/screenshots/healthcare-ai/secruty/security.png",
            caption: "Security settings and trusted device management",
            type: "image"
          },
          
          // Booking System
          {
            url: "/assets/screenshots/healthcare-ai/booking/booking1.png",
            caption: "Step 1: Doctor selection and appointment type",
            type: "image"
          },
          {
            url: "/assets/screenshots/healthcare-ai/booking/booking2.png",
            caption: "Step 2: Date and time slot selection with availability",
            type: "image"
          },
          {
            url: "/assets/screenshots/healthcare-ai/booking/booking4.png",
            caption: "Step 4: Appointment confirmation and payment processing",
            type: "image"
          },
          {
            url: "/assets/screenshots/healthcare-ai/appointment-scheduler.png",
            caption: "Advanced appointment scheduler with conflict management",
            type: "image"
          },
          
          // Doctor Portal
          {
            url: "/assets/screenshots/healthcare-ai/doctor/doctor-home.png",
            caption: "Doctor dashboard with patient appointments and analytics",
            type: "image"
          },
          {
            url: "/assets/screenshots/healthcare-ai/doctor/patient.png",
            caption: "Patient management system with medical records",
            type: "image"
          },
          {
            url: "/assets/screenshots/healthcare-ai/doctor/my-appointemnt.png",
            caption: "Doctor's appointment calendar and scheduling management",
            type: "image"
          },
          {
            url: "/assets/screenshots/healthcare-ai/doctor/analytics.png",
            caption: "Doctor analytics with patient statistics and performance metrics",
            type: "image"
          },
          {
            url: "/assets/screenshots/healthcare-ai/doctor/rating-system.png",
            caption: "Patient feedback and rating system for quality assurance",
            type: "image"
          },
          
          // Admin Panel
          {
            url: "/assets/screenshots/healthcare-ai/admin/dashboard.png",
            caption: "Administrator dashboard with system overview and metrics",
            type: "image"
          },
          {
            url: "/assets/screenshots/healthcare-ai/admin/doctors.png",
            caption: "Doctor verification and management system",
            type: "image"
          },
          {
            url: "/assets/screenshots/healthcare-ai/admin/analytics.png",
            caption: "Comprehensive analytics with usage statistics and trends",
            type: "image"
          }
        ],
        featured: true,
        order: 6,
        status: "active"
      }
    ];
  }

  setFilter(filterKey: string): void {
    this.activeFilter = filterKey;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.activeFilter === 'all') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(project => {
        const techStack = project.technologies.map(tech => tech.toLowerCase());
        
        switch (this.activeFilter) {
          case 'angular':
            return techStack.includes('angular');
          case 'react':
            return techStack.includes('react');
          case 'nodejs':
            return techStack.includes('node.js') || techStack.includes('nodejs');
          case 'fullstack':
            return (techStack.includes('angular') || techStack.includes('react') || techStack.includes('vue.js')) &&
                   (techStack.includes('node.js') || techStack.includes('nodejs') || techStack.includes('express'));
          default:
            return true;
        }
      });
    }
  }

  openLink(url: string): void {
    window.open(url, '_blank');
  }

  downloadCV(): void {
    window.open('/assets/cv/mohamed-hany-cv.pdf', '_blank');
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
