import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateIssuePayload, Issue, UpdateIssuePayload } from '@bugflow-2026/shared-types';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../api-config.token';

@Injectable({ providedIn: 'root' })
export class IssuesApiService {
  private http = inject(HttpClient);
  private config = inject(API_CONFIG);
  private baseUrl = `${this.config.baseUrl}/issues`;

  getIssues(filters: {
    status?: string;
    priority?: string;
    search?: string;
    projectId?: string;
  }): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.baseUrl, {
      params: {
        ...(filters.status && { status: filters.status }),
        ...(filters.priority && { priority: filters.priority }),
        ...(filters.search && { search: filters.search }),
        ...(filters.projectId && { projectId: filters.projectId }),
      },
    });
  }

  createIssue(data: CreateIssuePayload) {
    return this.http.post(this.baseUrl, data);
  }

  updateIssue(id: string, data: UpdateIssuePayload) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

}
