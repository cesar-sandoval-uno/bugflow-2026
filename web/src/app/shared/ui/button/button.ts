import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.html',
})
export class ButtonComponent {
  @Input() text = 'Button';
  @Input() isLoading = false;
  @Input() disabled = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() ariaLabel = '';

  @Output() clicked = new EventEmitter<void>();

  get isDisabled(): boolean {
    return this.disabled || this.isLoading;
  }

  get variantClasses() {
    switch (this.variant) {
      case 'secondary':
        return 'bg-secondary text-black';
      case 'danger':
        return 'bg-red-500 text-white';
      default:
        return 'bg-primary text-white hover:bg-blue-700';
    }
  }

  handleClick() {
    if (!this.isDisabled) {
      this.clicked.emit();
    }
  }

  get sizeClasses(): string {
    switch (this.size) {
      case 'sm':
        return 'px-3 py-2 text-sm';
      case 'lg':
        return 'px-6 py-4 text-lg';
      default:
        return 'px-4 py-3 text-sm';
    }
  }
}
