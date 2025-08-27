import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="getSectionClasses()">
      <h2 class="section-title__heading">{{ title }}</h2>
      <p *ngIf="subtitle" class="section-title__subtitle">{{ subtitle }}</p>
      <div *ngIf="showDivider" class="section-title__divider"></div>
    </div>
  `,
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() alignment: 'left' | 'center' | 'right' = 'center';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() showDivider = true;
  @Input() color: 'primary' | 'secondary' | 'dark' = 'dark';

  getSectionClasses(): string {
    const baseClasses = 'section-title';
    const alignmentClass = `section-title--${this.alignment}`;
    const sizeClass = `section-title--${this.size}`;
    const colorClass = `section-title--${this.color}`;

    return [baseClasses, alignmentClass, sizeClass, colorClass]
      .filter(Boolean)
      .join(' ');
  }
}
