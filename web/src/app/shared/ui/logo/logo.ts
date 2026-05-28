import { Component, Input } from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [NgClass, NgTemplateOutlet],
  templateUrl: './logo.html',
})
export class LogoComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() showWelcome = true;
  @Input() variant: 'default' | 'dark' | 'primary' = 'default';
  @Input() element: 'h1' | 'h2' | 'div' = 'div';

  get sizeClasses(): string {
    switch (this.size) {
      case 'sm':
        return 'text-lg';
      case 'lg':
        return 'text-3xl';
      default:
        return 'text-2xl';
    }
  }

  get bugColor(): string {
    if (this.variant === 'primary') return 'text-primary';
    if (this.variant === 'dark') return 'text-white';
    return 'text-primary';
  }

  get flowColor(): string {
    if (this.variant === 'primary') return 'text-primary';
    if (this.variant === 'dark') return 'text-white';
    return 'text-secondary';
  }

  get welcomeColor(): string {
    return this.variant === 'dark' ? 'text-gray-300' : 'text-dark';
  }
}
