import {
  Component,
  signal,
  input,
  HostListener,
} from '@angular/core';

import { Issue } from '@bugflow-2026/shared-types';

import { BadgeComponent } from '../../../../shared/ui/badge/badge';
import { CommentsComponent } from './comments/comments';

@Component({
  selector: 'app-issue-details-modal',
  standalone: true,
  imports: [
    BadgeComponent,
    CommentsComponent,
  ],
  templateUrl: './issue-details-modal.html',
})
export class IssueDetailsModalComponent {
  issue = signal<Issue | null>(null);

  isOpen = signal(false);

  open(issue: Issue) {
    document.body.style.overflow = 'hidden';

    this.issue.set(issue);
    this.isOpen.set(true);
  }

  close() {
    document.body.style.overflow = '';

    this.isOpen.set(false);
    this.issue.set(null);
  }

  @HostListener('document:keydown.escape')
  handleEscape() {
    if (!this.isOpen()) return;

    this.close();
  }
}
