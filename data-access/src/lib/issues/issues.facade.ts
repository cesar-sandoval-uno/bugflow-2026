import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { IssueStatus, IssuePriority, CreateIssuePayload, UpdateIssuePayload } from '@bugflow-2026/shared-types';
import { IssuesApiService } from './issues.api';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, map, startWith } from 'rxjs';

const STORAGE_KEY = 'bugflow-issues-filters';
const DEFAULT_FILTERS = {
  status: '' as IssueStatus | '',
  priority: '' as IssuePriority | '',
  search: '',
  projectId: '',
};

@Injectable({ providedIn: 'root' })
export class IssuesFacade {
  private api = inject(IssuesApiService);
  private refreshTrigger = signal(0);
  private filters = signal(this.loadInitialFilters());
  readonly filtersState = this.filters;
  readonly issuesState = toSignal(
    toObservable(
      computed(() => ({
        filters: this.filters(),
        refresh: this.refreshTrigger(),
      }))
    ).pipe(
      switchMap(({ filters }) =>
        this.api.getIssues(filters).pipe(
          map(data => ({ data, loading: false })),
          startWith({ data: [], loading: true })
        )
      )
    ),
    { initialValue: { data: [], loading: true } }
  );

  constructor() {
    effect(() => {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(this.filters())
      );
    });
  }

  private loadInitialFilters() {
    const saved = sessionStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return DEFAULT_FILTERS;
    }

    try {
      return {
        ...DEFAULT_FILTERS,
        ...JSON.parse(saved),
      };
    } catch {
      return DEFAULT_FILTERS;
    }
  }

  refresh() {
    this.refreshTrigger.update(v => v + 1);
  }

  setFilters(filters: {
    status: IssueStatus | '';
    priority: IssuePriority | '';
    search: string;
    projectId: string;
  }) {
    this.filters.set(filters);
  }

  clearFilters() {
    this.filters.set({
      status: '',
      priority: '',
      search: '',
      projectId: '',
    });
  }

  createIssue(data: CreateIssuePayload) {
    return this.api.createIssue(data);
  }

  updateIssue(id: string, data: UpdateIssuePayload) {
    return this.api.updateIssue(id, data);
  }

  loadIssuesOnce() {
    if (this.issuesState().data.length) return;
    this.refresh();
  }

}
