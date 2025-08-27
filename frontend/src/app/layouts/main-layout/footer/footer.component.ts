import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__content">
          <!-- Brand Section -->
          <div class="footer__brand">
            <h3 class="footer__brand-name">Mohany</h3>
            <p class="footer__brand-tagline">Full-Stack Developer</p>
            <p class="footer__brand-description">
              Building scalable web applications with modern technologies
            </p>
          </div>

          <!-- Quick Links -->
          <div class="footer__section">
            <h4 class="footer__section-title">Quick Links</h4>
            <nav class="footer__nav">
              <a routerLink="/" class="footer__link">Home</a>
              <a routerLink="/about" class="footer__link">About</a>
              <a routerLink="/projects" class="footer__link">Projects</a>
              <a routerLink="/blog" class="footer__link">Blog</a>
              <a routerLink="/contact" class="footer__link">Contact</a>
            </nav>
          </div>

          <!-- Technologies -->
          <div class="footer__section">
            <h4 class="footer__section-title">Technologies</h4>
            <div class="footer__tech-list">
              <span class="footer__tech-item">Angular</span>
              <span class="footer__tech-item">Node.js</span>
              <span class="footer__tech-item">MongoDB</span>
              <span class="footer__tech-item">TypeScript</span>
              <span class="footer__tech-item">Express</span>
            </div>
          </div>

          <!-- Social Links -->
          <div class="footer__section">
            <h4 class="footer__section-title">Connect</h4>
            <div class="footer__social">
              <a 
                *ngFor="let social of socialLinks" 
                [href]="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="footer__social-link"
                [attr.aria-label]="social.name"
              >
                <i [class]="social.icon"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Bottom Section -->
        <div class="footer__bottom">
          <div class="footer__bottom-content">
            <p class="footer__copyright">
              © {{ currentYear }} Mohamed Hany. All rights reserved.
            </p>
            <p class="footer__built-with">
              Built with <span class="footer__heart">♥</span> using Angular & Node.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/',
      icon: 'fab fa-github'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/',
      icon: 'fab fa-linkedin'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/',
      icon: 'fab fa-twitter'
    },
    {
      name: 'Email',
      url: 'mailto:mahamedhany8@gmail.com',
      icon: 'fas fa-envelope'
    }
  ];
}
