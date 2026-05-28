import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  message: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _toast = signal<Toast | null>(null);
  readonly toast = this._toast.asReadonly();

  show(message: string, type: ToastType = 'info') {
    this._toast.set({ message, type });

    setTimeout(() => {
      this._toast.set(null);
    }, 4000);
  }
}
