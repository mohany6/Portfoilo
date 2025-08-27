import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ButtonComponent } from '../../shared/components/button/button.component';


interface Technology {
  name: string;
  level: number; // 1-5 scale
  icon?: string;
  featured?: boolean;
}

interface Skill {
  category: string;
  icon: string;
  level: string;
  proficiency: number; // percentage for progress bar
  technologies: Technology[];
}



@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SectionTitleComponent,
    ButtonComponent
  ],
  template: `
    <div class="about">
      <div class="container">
        <!-- About Me Section -->
        <section class="about-intro">
          <div class="about-intro__content">
            <div class="about-intro__text">
              <app-section-title
                title="About Me"
                subtitle="I am a passionate full-stack developer with expertise in modern web technologies."
                alignment="left"
                [showDivider]="false"
              ></app-section-title>
              
              <div class="about-intro__description">
                <p>
                  I am a full-stack developer specializing in Angular, Node.js, and MongoDB. 
                  I'm passionate about creating innovative web applications and sharing knowledge 
                  through video coding tutorials and educational content.
                </p>
                <p>
                  My passion lies in creating clean, efficient code and delivering 
                  exceptional user experiences. I enjoy working with cutting-edge 
                  technologies and continuously learning new skills to stay current 
                  with industry trends.
                </p>
                <p>
                  When I'm not coding, I enjoy creating video tutorials, contributing to 
                  open-source projects, writing technical articles, and mentoring aspiring developers 
                  through online platforms and coding communities.
                </p>
              </div>

              <div class="about-intro__actions">
                <app-button 
                  variant="primary" 
                  size="lg"
                  (clicked)="downloadCV()"
                >
                  Download CV
                </app-button>
                <app-button 
                  variant="outline" 
                  size="lg"
                  (clicked)="scrollToSkills()"
                >
                  View Skills
                </app-button>
              </div>
            </div>
            
            <div class="about-intro__image">
              <img src="/assets/images/profile.jpg" alt="About mohany" />
            </div>
          </div>
        </section>

        <!-- Skills Section -->
        <section class="skills" id="skills">
          <app-section-title
            title="Skills & Technologies"
            subtitle="Here are the technologies and tools I work with to build modern applications."
          ></app-section-title>

          <div class="skills__grid">
            <div 
              *ngFor="let skill of skills" 
              class="skills__category"
              [attr.data-category]="skill.category.toLowerCase()"
            >
              <div class="skills__category-header">
                <div class="skills__category-icon">
                  <i [class]="skill.icon"></i>
                </div>
                <h3 class="skills__category-title">{{ skill.category }}</h3>
                <div class="skills__category-level">
                  <span class="skills__level-text">{{ skill.level }}</span>
                  <div class="skills__level-bar">
                    <div 
                      class="skills__level-fill" 
                      [style.width.%]="skill.proficiency"
                    ></div>
                  </div>
                </div>
              </div>
              
              <div class="skills__technologies">
                <div 
                  *ngFor="let tech of skill.technologies" 
                  class="skills__tech-badge"
                  [class.skills__tech-badge--featured]="tech.featured"
                >
                  <div class="skills__tech-icon" *ngIf="tech.icon">
                    <i [class]="tech.icon"></i>
                  </div>
                  <span class="skills__tech-name">{{ tech.name }}</span>
                  <div class="skills__tech-level">
                    <div 
                      class="skills__tech-dots"
                      [attr.data-level]="tech.level"
                    >
                      <span 
                        *ngFor="let dot of getDots(tech.level)" 
                        class="skills__tech-dot"
                        [class.skills__tech-dot--filled]="dot <= tech.level"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        <!-- Let's Connect Section -->
        <section class="connect">
          <div class="connect__background">
            <div class="connect__pattern"></div>
          </div>
          
          <div class="connect__content">
            <app-section-title
              title="Let's Connect"
              subtitle="I'm always interested in new opportunities, collaborations, and creating amazing projects together."
            ></app-section-title>

            <div class="connect__grid">
              <!-- Contact Information -->
              <div class="connect__info">
                <h3 class="connect__info-title">Get In Touch</h3>
                <div class="connect__contact-items">
                  <div class="connect__contact-item" data-type="email">
                    <div class="connect__contact-icon">
                      <i class="fas fa-envelope"></i>
                    </div>
                    <div class="connect__contact-details">
                      <label>Email</label>
                      <a href="mailto:mahamedhany8@gmail.com">mahamedhany8&#64;gmail.com</a>
                    </div>
                  </div>
                  
                  <div class="connect__contact-item" data-type="location">
                    <div class="connect__contact-icon">
                      <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="connect__contact-details">
                      <label>Location</label>
                      <span>Cairo, Egypt</span>
                    </div>
                  </div>
                  
                  <div class="connect__contact-item" data-type="work">
                    <div class="connect__contact-icon">
                      <i class="fas fa-video"></i>
                    </div>
                    <div class="connect__contact-details">
                      <label>Content Creation</label>
                      <span>Video coding tutorials</span>
                    </div>
                  </div>
                  
                  <div class="connect__contact-item" data-type="status">
                    <div class="connect__contact-icon">
                      <i class="fas fa-circle" style="color: #10b981;"></i>
                    </div>
                    <div class="connect__contact-details">
                      <label>Status</label>
                      <span>Available for projects</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Social Links -->
              <div class="connect__social">
                <h3 class="connect__social-title">Follow Me</h3>
                <p class="connect__social-subtitle">Stay updated with my latest projects and tutorials</p>
                
                <div class="connect__social-grid">
                  <a 
                    *ngFor="let social of socialLinks" 
                    [href]="social.url"
                    target="_blank"
                    class="connect__social-card"
                    [attr.aria-label]="social.name"
                    [attr.data-platform]="social.name.toLowerCase()"
                  >
                    <div class="connect__social-icon">
                      <i [class]="social.icon"></i>
                    </div>
                    <div class="connect__social-content">
                      <h4>{{ social.name }}</h4>
                      <span>{{ getSocialDescription(social.name) }}</span>
                    </div>
                    <div class="connect__social-arrow">
                      <i class="fas fa-arrow-right"></i>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <!-- Call to Action -->
            <div class="connect__cta">
              <div class="connect__cta-content">
                <h3>Ready to work together?</h3>
                <p>Let's discuss your project and bring your ideas to life!</p>
                <div class="connect__cta-actions">
                  <app-button 
                    routerLink="/contact" 
                    variant="primary" 
                    size="lg"
                  >
                    Send Me a Message
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
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  skills: Skill[] = [
    {
      category: 'Frontend',
      icon: 'fas fa-laptop-code',
      level: 'Expert',
      proficiency: 90,
      technologies: [
        { name: 'Angular', level: 5, icon: 'fab fa-angular', featured: true },
        { name: 'React', level: 4, icon: 'fab fa-react', featured: true },
        { name: 'Vue.js', level: 4, icon: 'fab fa-vuejs' },
        { name: 'TypeScript', level: 5, featured: true },
        { name: 'JavaScript', level: 5, icon: 'fab fa-js-square', featured: true },
        { name: 'HTML5', level: 5, icon: 'fab fa-html5' },
        { name: 'CSS3', level: 5, icon: 'fab fa-css3-alt' },
        { name: 'SASS/SCSS', level: 4, icon: 'fab fa-sass' }
      ]
    },
    {
      category: 'Backend',
      icon: 'fas fa-server',
      level: 'Advanced',
      proficiency: 85,
      technologies: [
        { name: 'Node.js', level: 5, icon: 'fab fa-node-js', featured: true },
        { name: 'Express.js', level: 5, featured: true },
        { name: 'Python', level: 4, icon: 'fab fa-python', featured: true },
        { name: 'Django', level: 3 },
        { name: 'REST APIs', level: 5, featured: true },
        { name: 'GraphQL', level: 3 }
      ]
    },
    {
      category: 'Databases',
      icon: 'fas fa-database',
      level: 'Advanced',
      proficiency: 80,
      technologies: [
        { name: 'MongoDB', level: 5, featured: true },
        { name: 'PostgreSQL', level: 4, featured: true },
        { name: 'MySQL', level: 4 },
        { name: 'Redis', level: 3 },
        { name: 'Firebase', level: 4, featured: true }
      ]
    },
    {
      category: 'Tools & DevOps',
      icon: 'fas fa-tools',
      level: 'Intermediate',
      proficiency: 75,
      technologies: [
        { name: 'Git', level: 5, icon: 'fab fa-git-alt', featured: true },
        { name: 'Docker', level: 4, icon: 'fab fa-docker', featured: true },
        { name: 'AWS', level: 3, icon: 'fab fa-aws' },
        { name: 'Nginx', level: 3 },
        { name: 'Jenkins', level: 2 },
        { name: 'Webpack', level: 4, featured: true },
        { name: 'Vite', level: 4 }
      ]
    }
  ];



  socialLinks = [
    { name: 'GitHub', url: 'https://github.com/', icon: 'fab fa-github' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/', icon: 'fab fa-linkedin' },
    { name: 'Twitter', url: 'https://twitter.com/', icon: 'fab fa-twitter' }
  ];

  downloadCV(): void {
    // Open the Google Docs CV
    window.open('https://docs.google.com/document/d/1htrayQMjZoz1wnnY8e_jUj79JloRi5Za/edit?usp=drive_link&ouid=103625594032209431851&rtpof=true&sd=true', '_blank');
  }

  scrollToSkills(): void {
    const element = document.getElementById('skills');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getDots(level: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }

  getSocialDescription(platform: string): string {
    const descriptions: { [key: string]: string } = {
      'GitHub': 'Check out my code',
      'LinkedIn': 'Connect professionally', 
      'Twitter': 'Follow my updates',
      'YouTube': 'Watch my tutorials',
      'Instagram': 'Behind the scenes'
    };
    return descriptions[platform] || 'Follow me';
  }
}
