import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export interface SelectOption<T = string> {
  value: T;
  label: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent<T = string>
  implements ControlValueAccessor
{
  @Input() id = '';
  @Input() ariaDescribedBy = '';
  @Input() options: SelectOption<T>[] = [];
  @Input() placeholder = '';
  @Input() customClass = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'sm';
  @Input() variant: 'default' | 'ghost' | 'error' = 'default';
  @Input() invalid = false;

  value: T | null = null;
  disabled = false;

  private onChange: (value: T) => void = () => {};
  private onTouched: () => void = () => {};
  private stringToClasses(classes: string) {
    return classes
      ?.split(' ')
      .filter(Boolean)
      .reduce((acc, cls) => {
        acc[cls] = true;
        return acc;
      }, {} as Record<string, boolean>);
  }

  get classes() {
    return {
      'w-full border rounded': true,

      'p-2': this.size === 'sm',
      'p-3': this.size === 'md',
      'p-4': this.size === 'lg',

      'border-red-500': this.invalid,
      ...this.stringToClasses(this.customClass),
    };
  }

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelect(value: T) {
    const parsed = this.options.find(o => o.value == value)?.value;
    this.value = parsed ?? value;
    this.onChange(this.value as T);
    this.onTouched();
  }
}
