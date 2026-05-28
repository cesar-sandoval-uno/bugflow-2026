import { Component, Input, WritableSignal } from '@angular/core';
import { IssueStatus, IssuePriority, Project } from '@bugflow-2026/shared-types';

@Component({
  selector: 'app-issue-filters',
  standalone: true,
  templateUrl: './issue-filters.html',
})
export class IssueFiltersComponent {
  @Input({ required: true })
  issuesLength!: number;

  @Input({ required: true })
  projects!: Project[];

  @Input({ required: true })
  filters!: WritableSignal<{
    status: IssueStatus | '';
    priority: IssuePriority | '';
    search: string;
    projectId: string;
  }>;

  statuses = Object.values(IssueStatus);
  priorities = Object.values(IssuePriority);

  updateStatus(value: string) {
    this.filters.update(f => ({
      ...f,
      status: value ? (value as IssueStatus) : '',
    }));
  }

  updatePriority(value: string) {
    this.filters.update(f => ({
      ...f,
      priority: value ? (value as IssuePriority) : '',
    }));
  }

  updateProject(value: string) {
    this.filters.update(f => ({
      ...f,
      projectId: value,
    }));
  }

  updateSearch(value: string) {
    this.filters.update(f => ({
      ...f,
      search: value,
    }));
  }
  

  clearFilters() {
    this.filters.set({
      status: '',
      priority: '',
      search: '',
      projectId: '',
    });
  }
}
