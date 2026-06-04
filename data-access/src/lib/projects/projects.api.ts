import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateProjectPayload, Project, UpdateProjectPayload } from '@bugflow-2026/shared-types';
import { API_CONFIG } from '../api-config.token';

@Injectable({ providedIn: 'root' })
export class ProjectsApiService {
  private http = inject(HttpClient);
  private config = inject(API_CONFIG);
  private baseUrl = `${this.config.baseUrl}/projects`;

  getProjects() {
    return this.http.get<Project[]>(this.baseUrl);
  }

  createProject(data: CreateProjectPayload) {
    return this.http.post<Project>(
      this.baseUrl,
      data,
    );
  }

  updateProject(id: string, data: UpdateProjectPayload) {
    return this.http.patch<Project>(
      `${this.baseUrl}/${id}`,
      data,
    );
  }

  deleteProject(id: string) {
    return this.http.delete(
      `${this.baseUrl}/${id}`
    );
  }
}
