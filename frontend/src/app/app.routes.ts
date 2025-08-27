import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent),
        title: 'Mohamed Hany - Full-Stack Developer'
      },
      {
        path: 'about',
        loadComponent: () => import('./modules/about/about.component').then(m => m.AboutComponent),
        title: 'About Me - Mohamed Hany'
      },
      {
        path: 'projects',
        loadComponent: () => import('./modules/projects/projects.component').then(m => m.ProjectsComponent),
        title: 'My Projects - Mohamed Hany'
      },

      {
        path: 'contact',
        loadComponent: () => import('./modules/contact/contact.component').then(m => m.ContactComponent),
        title: 'Contact Me - Mohamed Hany'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];