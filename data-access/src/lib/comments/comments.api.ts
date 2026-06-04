import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment, CreateCommentPayload } from '@bugflow-2026/shared-types';
import { API_CONFIG } from '../api-config.token';

@Injectable({
  providedIn: 'root',
})
export class CommentsApiService {
  private http = inject(HttpClient);
  private config = inject(API_CONFIG);
  private baseUrl = `${this.config.baseUrl}/issues`;

  getComments(issueId: string) {
    return this.http.get<Comment[]>(
      `${this.baseUrl}/${issueId}/comments`
    );
  }

  createComment(
    issueId: string,
    data: CreateCommentPayload,
  ) {
    return this.http.post(
      `${this.baseUrl}/${issueId}/comments`,
      data,
    );
  }

  updateComment(
    issueId: string,
    commentId: string,
    content: string,
  ) {
    return this.http.patch(
      `${this.baseUrl}/${issueId}/comments/${commentId}`,
      { content },
    );
  }

  deleteComment(
    issueId: string,
    commentId: string,
  ) {
    return this.http.delete(
      `${this.baseUrl}/${issueId}/comments/${commentId}`,
    );
  }

}
