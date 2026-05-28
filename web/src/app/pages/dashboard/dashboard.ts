import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuesFacade } from '@bugflow-2026/data-access';
import { IssueStatus } from '@bugflow-2026/shared-types';
import { CardComponent } from '../../shared/ui/card/card';
import { BadgeComponent } from '../../shared/ui/badge/badge';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent, BadgeComponent],
  templateUrl: './dashboard.html',
})
export class DashboardPage {
  private facade = inject(IssuesFacade);

  activities = [ 'John commented on "Login issue"', 'Maria closed "API timeout error"', 'Carlos created a new issue', ];
  state = this.facade.issuesState;
  stats = computed(() => {
    const issues = this.state().data;

    return [
      {
        label: 'Open Issues',
        value: issues.filter(i => i.status === IssueStatus.OPEN).length,
      },
      {
        label: 'In Progress',
        value: issues.filter(i => i.status === IssueStatus.IN_PROGRESS).length,
      },
      {
        label: 'In Testing',
        value: issues.filter(i => i.status === IssueStatus.IN_TEST).length,
      },
      {
        label: 'Closed Issues',
        value: issues.filter(i => i.status === IssueStatus.CLOSED).length,
      },
    ];
  });
  recentIssues = computed(() => {
    return this.state()
      .data
      .slice(0, 5);
  });

  constructor() {
    this.facade.loadIssuesOnce();
  }
}
