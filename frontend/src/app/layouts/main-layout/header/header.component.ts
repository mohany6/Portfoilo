import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface NavItem {
  label: string;
  path: string;
  active?: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header [class]="getHeaderClasses()">
      <nav class="navbar">
        <div class="navbar__container">
          <!-- Logo/Brand -->
          <div class="navbar__brand">
            <a routerLink="/" class="navbar__logo">
              <span class="navbar__logo-text">Mohany</span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="navbar__nav navbar__nav--desktop">
            <a 
              *ngFor="let item of navItems" 
              [routerLink]="item.path"
              class="navbar__link"
              [class.navbar__link--active]="item.active"
              routerLinkActive="navbar__link--active"
              [routerLinkActiveOptions]="{ exact: item.path === '/' }"
            >
              {{ item.label }}
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            class="navbar__toggle" 
            (click)="toggleMobileMenu()"
            [class.navbar__toggle--active]="isMobileMenuOpen"
          >
            <span class="navbar__toggle-line"></span>
            <span class="navbar__toggle-line"></span>
            <span class="navbar__toggle-line"></span>
          </button>
        </div>

        <!-- Mobile Navigation -->
        <div class="navbar__nav navbar__nav--mobile" [class.navbar__nav--mobile-open]="isMobileMenuOpen">
          <a 
            *ngFor="let item of navItems" 
            [routerLink]="item.path"
            class="navbar__link"
            routerLinkActive="navbar__link--active"
            [routerLinkActiveOptions]="{ exact: item.path === '/' }"
            (click)="closeMobileMenu()"
          >
            {{ item.label }}
          </a>
        </div>
      </nav>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;

  navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Contact', path: '/contact' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Listen to route changes to close mobile menu
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeMobileMenu();
      });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    if (window.innerWidth > 768) {
      this.closeMobileMenu();
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  getHeaderClasses(): string {
    const baseClasses = 'header';
    const scrolledClass = this.isScrolled ? 'header--scrolled' : '';
    const mobileOpenClass = this.isMobileMenuOpen ? 'header--mobile-open' : '';

    return [baseClasses, scrolledClass, mobileOpenClass]
      .filter(Boolean)
      .join(' ');
  }
}
