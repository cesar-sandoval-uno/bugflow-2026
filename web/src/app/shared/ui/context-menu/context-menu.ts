import {
  Component,
  signal,
  ElementRef,
  HostListener,
  input,
  inject,
} from '@angular/core';

export interface ContextMenuItem {
  label: string;
  action: () => void;
  danger?: boolean;
}

@Component({
  selector: 'app-context-menu',
  standalone: true,
  templateUrl: './context-menu.html',
})
export class ContextMenuComponent {
  private el = inject(ElementRef);
  items = input<ContextMenuItem[]>([]);
  isOpen = signal(false);

  toggle() {
    this.isOpen.update(v => !v);
  }

  close() {
    this.isOpen.set(false);
  }

  onItemClick(item: ContextMenuItem) {
    item.action();
    this.close();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.close();
  }
}
