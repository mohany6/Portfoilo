import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="getButtonClasses()"
      [disabled]="disabled || loading"
      (click)="handleClick()"
      [type]="type"
    >
      <span *ngIf="loading" class="loading-spinner"></span>
      <span [class.sr-only]="loading">
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() fullWidth = false;
  
  @Output() clicked = new EventEmitter<Event>();

  handleClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }

  getButtonClasses(): string {
    const baseClasses = 'btn';
    const variantClass = `btn--${this.variant}`;
    const sizeClass = `btn--${this.size}`;
    const fullWidthClass = this.fullWidth ? 'btn--full-width' : '';
    const loadingClass = this.loading ? 'btn--loading' : '';
    const disabledClass = this.disabled ? 'btn--disabled' : '';

    return [baseClasses, variantClass, sizeClass, fullWidthClass, loadingClass, disabledClass]
      .filter(Boolean)
      .join(' ');
  }
}
