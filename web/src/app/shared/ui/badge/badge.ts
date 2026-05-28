import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { IssueStatus } from '@bugflow-2026/shared-types';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [NgClass],
  templateUrl: './badge.html',
})
export class BadgeComponent {
  @Input() status: IssueStatus = IssueStatus.OPEN;
  @Input() size: 'sm' | 'md' = 'md';

  get label(): string {
    switch (this.status) {
      case IssueStatus.IN_PROGRESS:
        return 'In Progress';
      case IssueStatus.IN_TEST:
        return 'In Test';
      case IssueStatus.CLOSED:
        return 'Closed';
      default:
        return 'Open';
    }
  }

  get colorClasses(): string {
    switch (this.status) {
      case IssueStatus.OPEN:
        return 'bg-green-100 text-green-700';
      case IssueStatus.IN_PROGRESS:
        return 'bg-yellow-100 text-yellow-800';
      case IssueStatus.IN_TEST:
        return 'bg-blue-100 text-blue-800';
      case IssueStatus.CLOSED:
        return 'bg-gray-200 text-gray-700';
    }
  }

  get dotColor(): string {
    switch (this.status) {
      case IssueStatus.OPEN:
        return 'bg-green-500';
      case IssueStatus.IN_PROGRESS:
        return 'bg-yellow-500';
      case IssueStatus.IN_TEST:
        return 'bg-blue-500';
      case IssueStatus.CLOSED:
        return 'bg-gray-500';
    }
  }

  get sizeClasses(): string {
    return this.size === 'sm'
      ? 'text-xs px-2 py-1'
      : 'text-sm px-3 py-1.5';
  }
}
