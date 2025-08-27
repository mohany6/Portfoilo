import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="getCardClasses()">
      <div *ngIf="image" class="card__image">
        <img [src]="image" [alt]="imageAlt" />
      </div>
      <div class="card__content">
        <div *ngIf="title" class="card__title">
          <h3>{{ title }}</h3>
        </div>
        <div *ngIf="subtitle" class="card__subtitle">
          <p>{{ subtitle }}</p>
        </div>
        <div class="card__body">
          <ng-content></ng-content>
        </div>
        <div *ngIf="showFooter" class="card__footer">
          <ng-content select="[slot=footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() image?: string;
  @Input() imageAlt?: string = '';
  @Input() variant: 'default' | 'elevated' | 'outlined' = 'default';
  @Input() hover = true;
  @Input() showFooter = false;
  @Input() padding: 'sm' | 'md' | 'lg' = 'md';

  getCardClasses(): string {
    const baseClasses = 'card';
    const variantClass = `card--${this.variant}`;
    const hoverClass = this.hover ? 'card--hover' : '';
    const paddingClass = `card--padding-${this.padding}`;

    return [baseClasses, variantClass, hoverClass, paddingClass]
      .filter(Boolean)
      .join(' ');
  }
}
